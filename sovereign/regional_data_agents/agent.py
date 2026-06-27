import tenseal as ts
import opendp.prelude as dp
from typing import Dict, Any

# Enable OpenDP contrib features for Laplace mechanisms
dp.enable_features("contrib")

# Initialize TenSEAL Context for Homomorphic Encryption (CKKS scheme for floating point numbers)
context = ts.context(
    ts.SCHEME_TYPE.CKKS,
    poly_modulus_degree=8192,
    coeff_mod_bit_sizes=[60, 40, 40, 60]
)
context.generate_galois_keys()
context.global_scale = 2**40

class RegionalDataAgent:
    def __init__(self, region: str):
        self.region = region
        self.db_connection_mock = f"Connected to {region} PostgreSQL"
        print(f"[{self.region} Agent] Initialized.")

    def query_and_encrypt(self, query: str, epsilon: float) -> bytes:
        """
        Executes a query, applies Differential Privacy noise, and encrypts the result via TenSEAL.
        """
        print(f"[{self.region} Agent] Received query: '{query}' with privacy budget epsilon={epsilon}")
        
        # 1. Mock Database Query
        # In a production setting, this executes a query on the regional PostgreSQL DB.
        mock_raw_result = 150.0 
        print(f"[{self.region} Agent] Raw query result obtained from local DB.")

        # 2. Apply Differential Privacy using OpenDP (Laplace mechanism)
        # We create a simple laplace measurement scaled inversely to the epsilon privacy budget.
        space = dp.atom_domain(T=float), dp.absolute_distance(T=float)
        measurement = dp.m.make_laplace(*space, scale=1.0 / epsilon)
        
        dp_result = measurement(mock_raw_result)
        print(f"[{self.region} Agent] Applied DP noise. Anonymized result: {dp_result:.4f}")

        # 3. Homomorphically Encrypt the DP result using TenSEAL
        encrypted_result = ts.ckks_vector(context, [dp_result])
        print(f"[{self.region} Agent] Encrypted DP result using TenSEAL (CKKS).")

        # Return the serialized encrypted vector to be sent over A2A
        return encrypted_result.serialize()

if __name__ == "__main__":
    # Test the Agent logic
    agent_eu = RegionalDataAgent("EU")
    encrypted_data = agent_eu.query_and_encrypt("demographics", epsilon=1.0)
    print(f"[Main] Serialized encrypted payload size: {len(encrypted_data)} bytes")
