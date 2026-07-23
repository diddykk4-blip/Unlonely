export const submitApplication = async (formType, data) => {
  console.log(`Submitting ${formType} application...`, data);
  
  // Simulate network request
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Successfully submitted ${formType} application!`);
      resolve({ success: true, message: 'Application submitted successfully.' });
    }, 1500);
  });
};
