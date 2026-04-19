const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (script) {
      resolve(true);
      return;
    }

    const newScript = document.createElement('script');
    newScript.src = 'https://checkout.razorpay.com/v1/checkout.js';
    newScript.onload = () => resolve(true);
    newScript.onerror = () => resolve(false);
    document.body.appendChild(newScript);
  });
};

export const initiatePayment = async (orderData, prefill = {}) => {
  try {
    await loadRazorpayScript();

    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: 'INR',
      name: 'Service Connect',
      description: 'Service Payment',
      order_id: orderData.order_id,
      handler: function (response) {
        // Payment success - call verify endpoint
        window.location.href = `/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`;
      },
      prefill: {
        name: prefill.name || '',
        email: prefill.email || '',
        contact: prefill.contact || '',
      },
      theme: {
        color: '#1c2036',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('Payment initiation failed:', error);
    alert('Payment failed. Please try again.');
  }
};

