import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("nearinitiator-857f2-firebase-adminsdk-gswqs-1bc98f2f6d.json")

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://nearinitiator-857f2-default-rtdb.europe-west1.firebasedatabase.app/' 
})

ref = db.reference("/")
ref.set(
    {
	"Book1":
	{
		"Title": "The Fellowship of the Ring",
		"Author": "J.R.R. Tolkien",
		"Genre": "Epic fantasy",
		"Price": 100
	},
    }
)
print(ref)

