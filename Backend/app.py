from flask import Flask, request, jsonify
import subprocess
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    """
    API endpoint to receive user profile, run MPT analysis via subprocess,
    and return stock recommendations.
    """
    try:
        data = request.get_json()
        
        if not data or 'investmentAmount' not in data or 'riskTolerance' not in data:
            return jsonify({"error": "Missing required data"}), 400

        amount = data['investmentAmount']
        risk = data['riskTolerance']
        tickers = ",".join(data.get('tickers', []))

        # Build the command to run the portfolio_tool.py script
        command = ["python", "portfolio_tool.py", "--amount", str(amount), "--risk", risk]
        
        if tickers:
            command.extend(["--tickers", tickers])
        
        current_dir = os.path.dirname(os.path.abspath(__file__))
        
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            check=True,
            cwd=current_dir
        )
        
        recommendations = json.loads(result.stdout)

        return jsonify(recommendations)

    except subprocess.CalledProcessError as e:
        print(f"Error running Python script: {e.stderr}")
        return jsonify({"error": "An error occurred during MPT analysis"}), 500
    except json.JSONDecodeError:
        print("Error decoding JSON from Python script output.")
        return jsonify({"error": "Failed to process script output"}), 500
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")
        return jsonify({"error": "An unexpected error occurred"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)