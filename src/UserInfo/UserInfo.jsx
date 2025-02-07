import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth0 } from '@auth0/auth0-react';
import Notification from "../Notification/Notification";
import LoadingAnimation from '../LoadingAnim/LoadingAnim';
import 'animate.css';
import { db } from '../firebase-config';
import { FaUser, FaEnvelope, FaPhoneAlt, FaCity, FaMapMarkerAlt } from 'react-icons/fa';

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    createdAt: '',
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState({ message: '', visible: false });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchOrCreateUserData = async () => {
      if (isAuthenticated && user) {
        setLoading(true);
        const userDocRef = doc(db, 'users', user.email);

        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          } else {
            const newUser = {
              name: user.given_name || '',
              surname: user.family_name || '',
              email: user.email || '',
              phone: '',
              address: '',
              city: '',
              pincode: '',
              createdAt: new Date().toISOString(),
            };
            await setDoc(userDocRef, newUser);
            setUserData(newUser);
          }
          setNotification({ message: 'User data loaded successfully!', visible: true });
        } catch (error) {
          console.error('Error fetching or creating user data:', error.message);
          setNotification({ message: 'Error loading user data. Please try again.', visible: true });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrCreateUserData();
  }, [user, isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.name) newErrors.name = 'Name is required.';
    if (!userData.surname) newErrors.surname = 'Surname is required.';
    if (userData.phone && !/^\d{10}$/.test(userData.phone))
      newErrors.phone = 'Phone number must be 10 digits.';
    if (userData.pincode && !/^\d{6}$/.test(userData.pincode))
      newErrors.pincode = 'Pincode must be 6 digits.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setNotification({ message: 'Saving your changes...', visible: true });

    try {
      const userDocRef = doc(db, 'users', user.email);
      await setDoc(userDocRef, userData);
      setNotification({ message: 'User data updated successfully!', visible: true });
    } catch (error) {
      console.error('Error updating user data:', error.message);
      setNotification({ message: 'Failed to update user data.', visible: true });
    } finally {
      setEditMode(false);
    }
  };

  if (!isAuthenticated) {
    return <LoadingAnimation loadingText="⚡️🚀 Yo! Sign in first! 🔑✨" />;
  }

  if (loading || isLoading) {
    return <LoadingAnimation loadingText="🚀 Loading Your Information... Please Hold On! 🌀" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-pink-600 px-6 py-8">
            <div className="flex items-center">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200" />
              )}
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
                <p className="text-pink-100 mt-1">{userData.email}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  icon={<FaUser />}
                  label="Name"
                  name="name"
                  value={userData.name}
                  readOnly={!editMode}
                  onChange={handleChange}
                  error={errors.name}
                />
                <InputField
                  icon={<FaUser />}
                  label="Surname"
                  name="surname"
                  value={userData.surname}
                  readOnly={!editMode}
                  onChange={handleChange}
                  error={errors.surname}
                />
              </div>

              <InputField
                icon={<FaEnvelope />}
                label="Email"
                name="email"
                value={userData.email}
                readOnly
              />

              <InputField
                icon={<FaPhoneAlt />}
                label="Phone"
                name="phone"
                value={userData.phone}
                readOnly={!editMode}
                onChange={handleChange}
                error={errors.phone}
              />

              <InputField
                icon={<FaMapMarkerAlt />}
                label="Address"
                name="address"
                value={userData.address}
                readOnly={!editMode}
                onChange={handleChange}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  icon={<FaCity />}
                  label="City"
                  name="city"
                  value={userData.city}
                  readOnly={!editMode}
                  onChange={handleChange}
                />
                <InputField
                  icon={<FaMapMarkerAlt />}
                  label="Pincode"
                  name="pincode"
                  value={userData.pincode}
                  readOnly={!editMode}
                  onChange={handleChange}
                  error={errors.pincode}
                />
              </div>

              <div className="flex justify-center pt-6">
                <button
                  type="button"
                  onClick={() => (editMode ? handleSave() : setEditMode(true))}
                  className={`px-8 py-3 rounded-full text-white font-semibold transform transition-all duration-300 hover:scale-105 shadow-md
                    ${editMode ? 'bg-green-500 hover:bg-green-600' : 'bg-pink-600 hover:bg-pink-700'}`}
                >
                  {editMode ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {notification.visible && (
        <Notification
          message={notification.message}
          onClose={() => setNotification({ ...notification, visible: false })}
        />
      )}
    </div>
  );
};

const InputField = ({ icon, label, name, value, readOnly, onChange, error }) => (
  <div className="relative">
    <div className="flex">
      <div className={`flex items-center justify-center w-12 h-12 rounded-l-lg
        ${readOnly ? 'bg-gray-100' : 'bg-pink-600'}`}>
        <span className={`text-lg ${readOnly ? 'text-gray-500' : 'text-white'}`}>
          {icon}
        </span>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1 ml-2">
          {label}
        </label>
        <input
          type="text"
          name={name}
          value={value}
          readOnly={readOnly}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-r-lg border transition-all duration-200
            ${readOnly 
              ? 'bg-gray-50 text-gray-500 border-gray-200' 
              : 'bg-white text-gray-900 border-pink-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500'
            }
            ${error ? 'border-red-500' : ''}`}
        />
      </div>
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-500 ml-14">{error}</p>
    )}
  </div>
);

export default UserProfile;