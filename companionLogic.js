import { supabase } from './supabase.js';

document.getElementById('companionForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = {
    ageGroup: form.ageGroup.value,
    interests: form.interests.value.split(',').map(i => i.trim()),
    languages: form.languages.value.split(',').map(l => l.trim()),
    travelStyle: Array.from(form.querySelectorAll('input[name="travelStyle"]:checked')).map(el => el.value),
    accommodation: Array.from(form.querySelectorAll('input[name="accommodation"]:checked')).map(el => el.value),
    shareExpenses: form.querySelector('input[name="shareExpenses"]:checked') ? true : false,
    destination: JSON.parse(localStorage.getItem("tripData"))?.destination || null,
    startDate: JSON.parse(localStorage.getItem("tripData"))?.startDate || null,
    endDate: JSON.parse(localStorage.getItem("tripData"))?.endDate || null,
    user_uid: localStorage.getItem('currentUserUID'),
    email: localStorage.getItem('currentUserEmail')
  };

  // Save companion data to Supabase
  const { data, error } = await supabase
    .from('companions')
    .insert([formData]);

  if (error) {
    alert('Error saving data: ' + error.message);
    return;
  }

  // Redirect to match page (optional)
  window.location.href = 'match.html';
});
