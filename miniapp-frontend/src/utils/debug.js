// Debug utility for checking API connectivity
const DEBUG_API = async () => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    console.log('API_BASE_URL:', API_BASE_URL);

    // Test 1: Translations endpoint
    const translationsRes = await fetch(`${API_BASE_URL}/translations?page=login&lang=en`);
    console.log('Translations Response Status:', translationsRes.status);
    console.log('Translations Response:', await translationsRes.json());

    // Test 2: Auth endpoint (should fail with invalid creds, but shouldn't be 404)
    const authRes = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@test.com', password: 'wrong' })
    });
    console.log('Auth Response Status:', authRes.status);
    console.log('Auth Response:', await authRes.json());

  } catch (err) {
    console.error('API Debug Error:', err);
  }
};

// Call this in browser console to debug
window.DEBUG_API = DEBUG_API;

export default DEBUG_API;
