import unittest
from app.models.user import  User


class TestUserClass(unittest.TestCase):
    def test_user_init(self):
        # Test user initialization with valid input
        user = User(name='John Smith', email='johnsmith@example.com', password_hash='password')
        assert user.name == 'John Smith'
        assert user.email == 'johnsmith@example.com'
        assert user.password_hash == 'password'
        assert user.availability == True
        assert user.role == 'user'

    def test_user_init_invalid_email(self):
        # Test user initialization with invalid email
        with self.assertRaises(ValueError) as context:
            user = User(name='John Smith', email='johnsmithexample.com', password_hash='password')
        self.assertEqual(str(context.exception), 'Invalid Email')

    def test_user_init_invalid_password(self):
        # Test user initialization with invalid password
        with self.assertRaises(ValueError) as context:
            user = User(name='John Smith', email='johnsmith@example.com', password_hash='12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890')
        self.assertEqual(str(context.exception), 'Reason for visit is too long')

    def test_user_to_dict(self):
        # Test user to_dict method
        user = User(name='John Smith', email='johnsmith@example.com', password_hash='password')
        user_dict = user.to_dict()
        expected_dict = {
            'id': user.id,
            'name': 'John Smith',
            'email': 'johnsmith@example.com',
            'appointments': [],
            'meetings': [],
            'create_time': user.create_time,
            'updated_time': user.updated_time,
            'availability': True,
            'role': 'user'
        }
        self.assertDictEqual(user_dict, expected_dict)

    def test_user_update():
        # Test that the update method correctly updates the user's properties
        user = User('John', 'john@example.com', 'password')
        user.update('Jane', 'jane@example.com', 'new_password')
        assert user.name == 'Jane'
        assert user.email == 'jane@example.com'
        assert user.password_hash == 'new_password'

    def test_user_update_patch():
        # Create a new user
        user = User(name='John', email='john@example.com', password_hash='password123')
        user.save()
        patch_data = {
            'name': 'Jane',
            'email': 'jane@example.com'
        }
        user.update_patch(**patch_data)
        updated_user = User.query.get(user.id)
        assert updated_user.name == 'Jane'
        assert updated_user.email == 'jane@example.com'

    def test_user_save(self):
        # Test saving a new user to the database
        user = User(name='John', email='john@example.com', password_hash='password')
        user.save()
        assert user.id is not None
        assert user.name == 'John'
        assert user.email == 'john@example.com'
        assert user.password_hash == 'password'

    def test_user_delete(self):
        # Test deleting a user from the database
        user = User(name='John', email='john@example.com', password_hash='password')
        user.save()
        user_id = user.id
        user.delete()
        user = User.query.get(user_id)
        assert user is None
