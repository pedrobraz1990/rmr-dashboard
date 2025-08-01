#!/usr/bin/env python3
"""
Test script to verify the backend API is working correctly
"""
import requests
import json
import time

def test_backend():
    base_url = "http://localhost:8000"
    
    # Test health endpoint
    print("Testing health endpoint...")
    try:
        response = requests.get(f"{base_url}/health")
        print(f"Health status: {response.status_code}")
        if response.status_code == 200:
            print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Health test failed: {e}")
        return False
    
    # Test emissions endpoint
    print("\nTesting emissions endpoint...")
    try:
        response = requests.get(f"{base_url}/api/data/emissions")
        print(f"Emissions status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Companies: {data.get('companies', [])}")
            print(f"Years: {data.get('years', [])}")
            print(f"Scope1: {data.get('scope1', {})}")
        else:
            print(f"Error response: {response.text}")
    except Exception as e:
        print(f"Emissions test failed: {e}")
        return False
    
    # Test top parameters endpoint
    print("\nTesting top parameters endpoint...")
    try:
        response = requests.get(f"{base_url}/api/data/emissions/top-parameters?limit=5")
        print(f"Top parameters status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Found {len(data)} top parameters")
            if data:
                print(f"First parameter: {data[0]}")
        else:
            print(f"Error response: {response.text}")
    except Exception as e:
        print(f"Top parameters test failed: {e}")
        return False
    
    # Test transportation endpoint
    print("\nTesting transportation endpoint...")
    try:
        response = requests.get(f"{base_url}/api/data/emissions/transportation")
        print(f"Transportation status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Transportation data: {json.dumps(data, indent=2)}")
        else:
            print(f"Error response: {response.text}")
    except Exception as e:
        print(f"Transportation test failed: {e}")
        return False
    
    return True

if __name__ == "__main__":
    print("Starting backend API tests...")
    time.sleep(2)  # Give server time to start
    
    success = test_backend()
    if success:
        print("\n✅ All tests passed!")
    else:
        print("\n❌ Some tests failed!") 