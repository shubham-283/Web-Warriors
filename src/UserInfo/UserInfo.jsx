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
    <div className="container mx-auto p-6 mt-16 bg-gradient-to-br from-pink-50 to-pink-50 ">
      <h1 className="text-4xl font-bold text-center text-pink-700 mb-8 animate__animated animate__fadeIn">
        Account Details
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 animate__animated animate__fadeInUp">
        <div className="mb-8 text-center">
          {user.picture ? (
            <img
              src={user.picture}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-4 border-pink-400 shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto bg-gray-200"></div>
          )}
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => (editMode ? handleSave() : setEditMode(true))}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full shadow-md transition-transform duration-200 hover:-translate-y-1"
            >
              {editMode ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </form>
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
  <div className="mb-4">
    <div className="flex items-center">
      <span className="text-white p-3 rounded-l-lg bg-gradient-to-r from-pink-500 to-fuchsia-500">
        {icon}
      </span>
      <div className="w-full">
        <label className="block text-sm font-medium text-pink-700 mb-1">{label}</label>
        <input
          type="text"
          name={name}
          value={value}
          readOnly={readOnly}
          onChange={onChange}
          className={`border rounded-r-lg w-full px-4 py-2 transition
            ${readOnly ? 'bg-gray-100 text-gray-500' : 'bg-white text-pink-700 border-pink-200 focus:border-pink-500 focus:ring-pink-500'}
            ${error ? 'border-red-500' : ''}`}
        />
      </div>
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default UserProfile;