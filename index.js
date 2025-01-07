// importing the correct configurations
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const http = require('http');
const https = require('https');
const fs = require('fs');

// Load SSL certificates (adjust paths as necessary)
const privateKey = fs.readFileSync('../10.1.10.44-key.pem', 'utf8');
const certificate = fs.readFileSync('../10.1.10.44.pem', 'utf8');

// Create HTTPS service
const credentials = { key: privateKey, cert: certificate};

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON body

// Zoho CRM API base URL
const ZOHO_API_URL = 'https://www.zohoapis.com/crm/v2';

//Format for token refresh
let accessToken = process.env.ZOHO_ACCESS_TOKEN; // Initial access token
const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
const clientId = process.env.ZOHO_CLIENT_ID;
const clientSecret = process.env.ZOHO_CLIENT_SECRET;
const refreshUrl = process.env.ZOHO_REFRESH_URL;

// Function to refresh the access token
async function refreshAccessToken() {
  try {
    const response = await axios.post(refreshUrl, null, {
      params: {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
      },
    });
   
   // grabs the access token, stores it, and outputs it
   accessToken = response.data.access_token;
   console.log('Access token refreshed: ', accessToken);
  }catch(error){
   // if there is an error getting the token
   console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
   throw new Error('Unable to refresh access token');
  }
}


// Route to handle Zoho API request
app.post('/search', async (req, res) => {
  const { email } = req.body;

  try {
    // Make the request to the contact module with the email from the conversation
    const contact = await axios.get(`${ZOHO_API_URL}/contacts/search?email=${email}`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
    });

    // Grab accountID and accountName from the contact
    accountID = contact.data.data[0].Account_Name.id;
    accountName = contact.data.data[0].Account_Name.name;    

    // make the request to the accounts module with the accountID grabbed from the contact
    const account = await axios.get(`${ZOHO_API_URL}/accounts/${accountID}`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
    });

    // make the request to the potential buyers module with the email from the conversation
    const potentialBuyer = await axios.get(`${ZOHO_API_URL}/Potential_Buyers/search?email=${email})`,{
      headers: {
	Authorization: `Zoho-oauthtoken ${accessToken}`, 
      },
    });

    // encode the account name for searching purposes
    // must be encoded as most account names contain spaces
    const encodedAccountName = encodeURIComponent(accountName);

    // make the request to the prospective sellers with the encoded account name that was grabbed from the contact
    const prospectiveSeller = await axios.get(`${ZOHO_API_URL}/Prospective_Sellers/search?criteria=(Name:equals:${encodedAccountName})`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
    });

    // format the output and send it to the frontend
    res.json({
	contact: contact.data,
	account: account.data,
	potentialBuyer: potentialBuyer.data,
	prospectiveSeller: prospectiveSeller.data,
    }); 

  } catch (error) { // catch if there is an error connecting
    if (error.response && error.response.status == 401){
      try{
        await refreshAccessToken();

        const retryResponse = await axios.get(`${ZOHO_API_URL}/contacts/search?email=${email}`, {
          headers: {
            Authorization: `Zoho-oauthtoken ${accessToken}`,
          },
        });

        res.json(retryResponse.data);
      }catch(refreshError){
        console.error('Faild to refresh access token', refreshError.message);
        res.status(500).send('Error fethcing data from Zoho after token refresh');
              }
 
      
    }else{
      console.error('Error fetching data from Zoho:', error.message);
      res.status(500).send('Error fetching data from Zoho');
   }
  }
});

// Start the server on port 5001
const PORT = process.env.PORT || 5001;
https.createServer(credentials,app).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

