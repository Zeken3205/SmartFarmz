import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Load your RandomForest model from the pickle file
with open("RandomForest.pkl", "rb") as file:
    model = pickle.load(file)
with open("rf_pipeline.pkl", "rb") as file:
    fertmodel = pickle.load(file)


@app.route('/predict',methods=['POST'])
def predict():
    try:
        input_data = request.get_json()
        # Get the input data from the POST request
        N = input_data.get("N")
        P = input_data.get("P")
        K = input_data.get("K")
        tempreature = input_data.get("tempreature")
        humidity = input_data.get("humidity")
        ph = input_data.get("ph")
        rainfall = input_data.get("rainfall")

        input_array = np.array([[N, P, K, tempreature, humidity, ph, rainfall]])

        # Perform prediction using your model
        result = model.predict(input_array)

        # Return the predictions as JSON
        return jsonify({'success': True,'result': result.tolist()})
    except Exception as e:
        return jsonify({'success': False,'error': str(e)})

@app.route('/fertilizer_predict',methods=['POST'])
def fertilizer_predict():
    try:
        input_data = request.get_json()
        # Get the input data from the POST request
        N = input_data.get("N")
        P = input_data.get("P")
        K = input_data.get("K")
        tempreature = input_data.get("tempreature")
        humidity = input_data.get("humidity")
        moisture = input_data.get("moisture")
        soil_name = input_data.get("soiltype")
        crop_name = input_data.get("croptype")
        # Define a dictionary to map crop names to IDs
        crop_name_to_id = {
            'Barley': 0,
            'Cotton': 1,
            'Ground Nuts': 2,
            'Maize': 3,
            'Millets': 4,
            'Oil seeds': 5,
            'Paddy': 6,
            'Pulses': 7,
            'Sugarcane': 8,
            'Tobacco': 9,
            'Wheat': 10,
        }
        # Define a dictionary to map soil type names to IDs
        soil_type_to_id = {
            'Black': 0,
            'Clayey': 1,
            'Loamy': 2,
            'Red': 3,
            'Sandy': 4
        }

        # Function to get the ID for a given crop name
        def get_crop_id(crop_name):
            return crop_name_to_id.get(crop_name)
        
        # Function to get the ID for a given soil name
        def get_soil_id(soil_name):
            return soil_type_to_id.get(soil_name)

        # Check if the crop name is valid
        crop_id = get_crop_id(crop_name)
        soil_id = get_soil_id(soil_name)

        if crop_id is not None:
            # If the crop name is valid, create the input array
            input_array = np.array([[tempreature, humidity, moisture, soil_id,crop_id,N, P, K]])

            # Perform prediction using your model
            result = fertmodel.predict(input_array)
            
            fertilizer_id_to_name = {
                0: '10-26-26',
                1: '14-35-14',
                2: '17-17-17',
                3: '20-20',
                4: '28-28',
                5: 'DAP',
                6: 'Urea'
            }
            def get_fert_name(fert_id):
                return fertilizer_id_to_name.get(fert_id, "Fertilizer not found")
            
            # Convert the NumPy array to an integer ID
            result_id = int(result[0])

            # Use the result_id to get the fertilizer name
            fertilizer_name = get_fert_name(result_id)

            return jsonify({'success': True, 'result': fertilizer_name})
        else:
            # If the crop name is not found, return an error response
            return jsonify({'success': False, 'error': 'Invalid crop name'})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


if __name__ == "__main__":
    app.run(debug=True)