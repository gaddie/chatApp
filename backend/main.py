from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure your database URL
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///customer.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    UserID = db.Column(db.Integer)
    Timestamp = db.Column(db.DateTime) 
    Message = db.Column(db.String)

# Step 1: Read data from XLSX file
# xlsx_file_path = 'data.xlsx'
# df = pd.read_excel(xlsx_file_path)

# Step 2: Initialize the database
with app.app_context():
    db.create_all()

# Step 3: Insert data into the database
# with app.app_context():
#     for _, row in df.iterrows():
#         customer = Customer(
#             UserID=row['User ID'],
#             Timestamp=row['Timestamp (UTC)'],
#             Message=row['Message Body']
#             # Add more columns as needed
#         )
#         db.session.add(customer)

#     db.session.commit()

@app.route('/')
def home():
    # Step 4: Retrieve data from the database
    with app.app_context():
        customers = Customer.query.all()
        # Convert the data to a list of dictionaries
        data = [{'UserID': customer.UserID, 'Timestamp': customer.Timestamp, 'Message': customer.Message} for customer in customers]
        # Return the data as JSON
        return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
