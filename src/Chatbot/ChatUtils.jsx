export const generateResponse = function(text, productData, quickOptionAction = null) {
  let lowerText = text ? text.toLowerCase() : "";
  let response = { content: "", buttons: [] };

  // 1. Handle Quick Options FIRST and ISOLATE the logic
  if (quickOptionAction) {
      if (quickOptionAction === "recommend") {
          response = {
              content: "I'd love to help you find the perfect product! What type of item are you looking for?",
              buttons: [
                  { label: "Browse Categories", path: "/products?showCategories=true" },
                  { label: "View New Arrivals", path: "/new-arrivals" }
              ]
          };
      } else if (quickOptionAction === "size") {
          response = {
              content: "Need help finding your perfect size? I can help with measurements or show you our size chart.",
              buttons: [
                  { label: "View Size Chart", path: "/size-chart" },
                  { label: "Contact a Stylist", path: "/contact-us" }
              ]
          };
      } else if (quickOptionAction === "order") {
          response = {
              content: "I can help you track orders or assist with any order-related questions. What do you need?",
              buttons: [
                  { label: "Track Order", path: "/orders" },
                  { label: "View Order History", path: "/orders" },
                  { label: "Contact Support", path: "/contact-us" }
              ]
          };
      } else if (quickOptionAction === "shipping") {
          response = {
              content: "Let me tell you about our shipping options and delivery times! We offer free shipping above ₹999.",
              buttons: [
                  { label: "Shipping Policy", path: "/shipping-policy" },
                  { label: "Check Order Status", path: "/orders" }
              ]
          };
      }
      return response; // IMPORTANT:  Return IMMEDIATELY after handling the quick option
  }

  // 2. Handle Greetings
  if (text && (lowerText.includes("namaste") || lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("greetings"))) {
      if (lowerText.includes("namaste")) {
          response = {
              content: "Namaste! How can I assist you today?",
              buttons: [
                  { label: "Shop Now", path: "/products" },
                  { label: "Contact Us", path: "/contact-us" }
              ]
          };
      } else {
          response = {
              content: "Hello! How can I help you?",
              buttons: [
                  { label: "Browse Products", path: "/products" },
                  { label: "Track Order", path: "/orders" }
              ]
          };
      }
      return response; // Return after handling greeting
  }

  // 3.  Handle Product Search ONLY if text is provided AND it's not a greeting
  if (text && productData && Array.isArray(productData)) {
      try {
          const matchedProducts = productData.filter(product => {
              const productName = product.Name ? product.Name.toLowerCase() : '';
              const productDescription = product.Description && product.Description.Detail ? product.Description.Detail.toLowerCase() : '';
              const productCategory = product.Category ? product.Category.toLowerCase() : '';
              const productSubCategory = product.Sub_Category ? product.Sub_Category.toLowerCase() : '';

              return (
                  productName.includes(lowerText) ||
                  productDescription.includes(lowerText) ||
                  productCategory.includes(lowerText) ||
                  productSubCategory.includes(lowerText)
              );
          });

          if (matchedProducts.length > 0) {
              response = {
                  content: `Found ${matchedProducts.length} product(s) matching your query. Would you like to filter your results?`,
                  buttons: [
                      { label: "View All Results", path: `/search-results?query=${encodeURIComponent(text)}` },
                  ]
              };
          } else {
              // No Products Found: Suggest Categories & Subcategories
              const uniqueCategories = [...new Set(productData.map(product => product.Category).filter(Boolean))];
              const uniqueSubcategories = [...new Set(productData.map(product => product.Sub_Category).filter(Boolean))];

              if (lowerText.includes("category")) {
                  if (uniqueCategories.length > 0) {
                      response = {
                          content: "Here are the categories we have! Which one would you like to explore?",
                          buttons: uniqueCategories.map(category => ({ label: category, path: `/products?category=${encodeURIComponent(category)}` }))
                      };
                  } else {
                      response = {
                          content: "We don't have any categories available right now.",
                          buttons: [
                              { label: "Browse All Products", path: "/products" },
                              { label: "Contact Us for Assistance", path: "/contact-us" }
                          ]
                      };
                  }
              } else if (lowerText.includes("subcategory") || lowerText.includes("sub-category")) {
                  if (uniqueSubcategories.length > 0) {
                      response = {
                          content: "Here are the sub-categories we have! Which one would you like to explore?",
                          buttons: uniqueSubcategories.map(subcategory => ({ label: subcategory, path: `/products?subcategory=${encodeURIComponent(subcategory)}` }))
                      };
                  } else {
                      response = {
                          content: "We don't have any subcategories available right now.",
                          buttons: [
                              { label: "Browse All Products", path: "/products" },
                              { label: "Contact Us for Assistance", path: "/contact-us" }
                          ]
                      };
                  }
              } else {
                  response = {
                      content: `We don't have any items matching "${text}" right now. Would you like to browse our categories or see all products?`,
                      buttons: [
                          { label: "Browse Categories", path: "/products?showCategories=true" },
                          { label: "Browse All Products", path: "/products" },
                          { label: "Contact Us for Assistance", path: "/contact-us" }
                      ]
                  };
              }
          }
          return response; // Return after handling product search (success or failure)
      } catch (error) {
          console.error('Error in product search:', error);
          response = {
              content: "I apologize, but I'm having trouble processing that request. Could you try rephrasing it?",
              buttons: [
                  { label: "Try Again", path: "/help" }
              ]
          };
          return response; // Return after error handling
      }
  }

//4. Handle general keywords only if text is provided and not a greeting and product search is not performed.
  if (text) {
      if (lowerText.includes("size") || lowerText.includes("measurement")) {
          response = {
              content: "Finding the right size is crucial for a perfect fit! Would you like to see our size guide or get personalized sizing help?",
              buttons: [
                  { label: "View Size Guide", path: "/size-chart" },
                  { label: "Chat with Sizing Expert", path: "/contact-us" }
              ]
          };
      } else if (lowerText.includes("shipping") || lowerText.includes("delivery")) {
          response = {
              content: "We offer free shipping on orders above ₹999! Standard delivery takes 3-5 business days. Would you like to know more about our shipping options or track an existing order?",
              buttons: [
                  { label: "Shipping Policy", path: "/shipping-policy" },
                  { label: "Track Order", path: "/orders" }
              ]
          };
      } else if (lowerText.includes("return") || lowerText.includes("exchange")) {
          response = {
              content: "Need to return or exchange an item? No problem! Check out our return policy for detailed instructions, or contact us for assistance.",
              buttons: [
                  { label: "Return Policy", path: "/return-policy" },
                  { label: "Contact Us", path: "/contact-us" }
              ]
          };
      } else if (lowerText.includes("cancel") || lowerText.includes("cancellation")) {
          response = {
              content: "To cancel an order, please visit your order history or contact our support team immediately. Note that cancellation might not be possible if the order is already processed.",
              buttons: [
                  { label: "Order History", path: "/orders" },
                  { label: "Contact Support", path: "/contact-us" }
              ]
          };
      } else if (lowerText.includes("gift card") || lowerText.includes("gift voucher")) {
          response = {
              content: "Looking for the perfect gift? Our gift cards make great presents! You can purchase them online and send them directly to your loved ones.",
              buttons: [
                  { label: "Buy Gift Card", path: "/gift-cards" },
                  { label: "Check Gift Card Balance", path: "/gift-card-balance" }
              ]
          };
      } else if (lowerText.includes("store location") || lowerText.includes("physical store")) {
          response = {
              content: "We have several store locations where you can shop in person. Would you like to find a store near you?",
              buttons: [
                  { label: "Find a Store", path: "/store-locator" }
              ]
          };
      } else if (lowerText.includes("loyalty program") || lowerText.includes("reward points")) {
          response = {
              content: "Join our loyalty program to earn reward points and get exclusive discounts! Would you like to sign up or check your balance?",
              buttons: [
                  { label: "Join Loyalty Program", path: "/loyalty-program" },
                  { label: "Check Reward Points", path: "/reward-points" }
              ]
          };
      } else if (lowerText.includes("bulk order") || lowerText.includes("wholesale")) {
          response = {
              content: "Looking for bulk purchases or wholesale orders? We offer special discounts for bulk buyers! Contact us for more details.",
              buttons: [
                  { label: "Contact Sales", path: "/contact-sales" }
              ]
          };
      } else if (lowerText.includes("career") || lowerText.includes("jobs")) {
          response = {
              content: "Looking for a career opportunity? We’re always on the lookout for talented individuals to join our team. Check out our open positions!",
              buttons: [
                  { label: "View Careers", path: "/careers" }
              ]
          };
      } else {
          // Improved Default Response
          response = {
              content: "I'm here to help! What are you looking for today?",
              buttons: [
                  { label: "Browse Collections", path: "/products" },
                  { label: "Check Order", path: "/orders" },
                  { label: "View Policies", path: "/privacy-policy" },
              ]
          };
      }
    return response;
  }

  // 5.  Default response if NO text is provided AND no quick option is selected
  response = {
      content: "I apologize, but I'm having trouble understanding that. Could you try again?",
      buttons: [
          { label: "Try Again", path: "/help" }
      ]
  };
  return response;
};
