#!/usr/bin/env python3
"""
Minimal test application for Railway deployment
"""
import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return {'message': 'Hello from Railway!', 'port': os.environ.get('PORT', 'unknown')}

@app.route('/health')
def health():
    return {'status': 'healthy'}

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port) 