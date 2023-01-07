import unittest
from app.models.user_appointments import UserAppointment


class TestUserAppointment(unittest.TestCase):
    def setUp(self):
        self.user_appointment = UserAppointment(
            first_name='John',
            last_name='Doe',
            user_email='john.doe@example.com',
            to_visit_id='some-user-id',
            reason_for_visit='To discuss a project',
            terms_signature_name='John Doe'
        )

    def test_user_appointment_to_dict(self):
        # Test that the to_dict method returns a dictionary with the correct keys and values
        user_appointment_dict = self.user_appointment.to_dict()
        self.assertEqual(user_appointment_dict, {
            'id': self.user_appointment.id,
            'create_time': self.user_appointment.create_time,
            'updated_time': self.user_appointment.updated_time,
            'first_name': 'John',
            'last_name': 'Doe',
            'user_email': 'john.doe@example.com',
            'to_visit_id': 'some-user-id',
            'reason_for_visit': 'To discuss a project',
            'terms_signature_name': 'John Doe'
        })

    def test_user_appointment_update(self):
        # Test that the update method updates the updated_time field
        updated_time = self.user_appointment.updated_time
        self.user_appointment.update()
        self.assertNotEqual(self.user_appointment.updated_time, updated_time)

    def test_user_appointment_save(self):
        # Test that the save method saves the user appointment to the database
        self.user_appointment.save()
        user_appointment = UserAppointment.query.get(self.user_appointment.id)
        self.assertEqual(user_appointment, self.user_appointment)

    def test_user_appointment_delete(self):
        # Test that the delete method deletes the user appointment from the database
        self.user_appointment.save()
        self.user_appointment.delete()
        user_appointment = UserAppointment.query.get(self.user_appointment.id)
        self.assertEqual(user_appointment, None)
