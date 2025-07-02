# Step 1: Frontend Setup (React App) 
- create a dict
- Open the terminal
- Run this to create a React APP ``` npx create-react-app cloud-dictionary ```
- This will create a React app
-  ``` npm install axios ```
-  Run this to install Axios dependencies
-  Open the src/ folder
-  Inside App.js, paste this
```
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://7iv56lhkcg.execute-api.us-east-1.amazonaws.com/prod/get-definition?term=${encodeURIComponent(term)}`
      );
      setDefinition(res.data.definition);
    } catch (err) {
      setDefinition("Definition not found or error occurred.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "5rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#fff", marginBottom: "2rem" }}>🌩️ Cloud Dictionary</h1>
      <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)", width: "90%", maxWidth: "500px", textAlign: "center" }}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter a cloud term..."
          style={{ padding: "0.7rem 1rem", width: "70%", border: "1px solid #ccc", borderRadius: "10px", fontSize: "16px", marginRight: "1rem" }}
        />
        <button onClick={handleSearch} style={{ padding: "0.7rem 1.2rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>
          Search
        </button>
        {definition && (
          <div style={{ marginTop: "2rem", backgroundColor: "#f4f4f4", padding: "1rem 1.5rem", borderRadius: "10px", textAlign: "left", color: "#333", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: 0, marginBottom: "0.5rem", color: "#444" }}>{term}</h3>
            <p style={{ margin: 0 }}>{definition}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

```
- To test run the App Locally using  ``` npm start ```

# Step - 1.1(Push the code to Git)

- Open terminal
-  Run
```
git init
git remote add origin https://github.com/<your username>/<Repo name>
git add .
git commit -m "Initial commit"
git push -u origin main
```
# Step - 1.2(Deploying using AWS Amplify)

- Log into console, find Amplify
-  Click On Depoly an app
-  select Git
-  Select your REPO name / if your new , you have to loginto in git to connect AMPLIFY
-  selct main branch
-  then done
-  Deploy your app , you will get a live link to see your app

   # Step - 2(Backend Setup DynamoDB and Lambda)
  1. Open DynamoDB Console
  2. Created table:
      2.1 Name: ```CloudDictionary```
      2.2 Partition Key: ```term``` (String)
      2.3 Left rest default
   # Step 2.1 (Upload Data to DynamoDB)
  - Create a File data set.json locally
```  [
  {
    "term": "AWS KMS",
    "definition": "Key Management Service helps to create and control encryption keys."
  },
  {
    "term": "S3",
    "definition": "Simple Storage Service used for object storage."
  }
]
  ```
- create another file named ```upload_data.py```
- Paste this
```
import boto3
import json

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('CloudDictionary')

with open('dataset.json') as file:
    items = json.load(file)
    for item in items:
        table.put_item(Item=item)
```   
- LOGIN TO CLI
- GIVE YOUR CREDENTIALS(ACESS ID, PASSWORD)
- once done run the code - ``` python upload_data.py ```
- this will upload the json file to DYNAMODB

# Step 2.2( Creating Lambda Function )
- Inside the console , Create a Lambda funtion
- author from scratch
- in the code section upload the file given Lambda.zip and deploy
- your lambda function is ready

  # Step 3 (API Gateway Setup)
  1.Go to  API Gateway → REST API
  2. Created a new API:
  2.1-Resource: /get-definition
  2.2-Method: GET
  2.3-Integration: Lambda (FetchDefinition)
  2.4-✅ Enabled CORS
  3. Deployed API:
  3.1-Action → Deploy API
  3.2-Stage: prod
  - you will get an URL (for backend check)

   # PROJECT IS READY !!!!

   
    # THANK YOU NOW  !! 

   
