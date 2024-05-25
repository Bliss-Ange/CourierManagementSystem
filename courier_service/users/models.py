from django.db import models
import uuid, datetime
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Permission, Group

USER_ROLE = (
    ('Super Admin', 'Super Admin'),
    ('Staff', 'Staff'),
    ('Client', 'Client'),
)

class UserProfile(AbstractBaseUser, PermissionsMixin):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    username = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=120, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    email = models.EmailField(
        max_length=60, unique=False, blank=True, null=True)
    role = models.CharField(choices=USER_ROLE, max_length=200, blank=True, null=True)
    contact_number = models.CharField(max_length=11, unique=True, blank=True, null=True, validators=[
        RegexValidator(
            regex='(\+?0{1,9})[0-46-9][0-9]{7,9}$',
            message='Please use the correct contact number',
            code='invalid_contact_number'
        ), ])
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    user_permissions = models.ManyToManyField(Permission, related_name='user_profiles')
    groups = models.ManyToManyField(Group, related_name='user_profiles')
