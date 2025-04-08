from Members.models import Members, Profile  # Replace 'your_app'
from uuid import uuid4

def generate_unique_id():
    return uuid4()

# Get all existing members
members = Members.objects.all()

for member in members:
    try:
        # Check if a profile already exists for this member
        profile = Profile.objects.get(user=member)
        print(f"Profile already exists for {member.username}: {profile.buyerid}")
    except Profile.DoesNotExist:
        # Create a new profile for this member
        new_profile = Profile(
            user=member,
            username=generate_unique_id(),  # Generate a unique username for the profile
            account=0,
            phone_number=700000000,
            country="Kenya",
            city="mombasa",
            profile_pic="profile_pics/download.png"
        )
        new_profile.save()
        print(f"Created profile for {member.username}: {new_profile.buyerid}")

# You can also create a profile for a specific member by username:
try:
    specific_member = Members.objects.get(username='testuser')  # Replace 'testuser'
    Profile.objects.create(
        user=specific_member,
        username=generate_unique_id(),
        account=100,
        phone_number=711111111,
        country="Uganda",
        city="Kampala",
        # profile_pic can be set to an ImageFile object if you have one
    )
    print(f"Created profile for {specific_member.username}")
except Members.DoesNotExist:
    print("User not found.")
except Exception as e:
    print(f"Error creating profile: {e}")


from django.core.mail import send_mail

send_mail(
    'Test Email from DigitalOcean',
    'This is a test email sent from your Django application on DigitalOcean.',
    'aga.imbali1@gmail.com',
    ['aga.imbali1@gmail.com'],
    fail_silently=False,
)