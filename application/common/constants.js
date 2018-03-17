let constants = {
    error_message : {
        general_error : "Something went wrong!",
        cannot_send_mail : "Cannot send mail, please try again",
        user_not_found : "User not found",
        user_is_blocked : "This customer has been blocked.Contact administrator",
        invalid_credentials : "Invalid credentials",
        password_not_matched : "Password does not match",
        invalid_otp : "Invalid OTP, Please try again",
        same_password : "Current Password and New Password cannot be same",
        incorrect_current_password : "Current Password is incorrect",
        token_missing : "Token is missing",
        authentication_failed : "Authentication failed",
        product_not_found : "Product not found,Invalid product ID",
        empty_cart: "Cart is empty"

    },
    error_code : {
        general_error:1000,
        validation_error : 1001,
        cannot_send_mail : 1002,
        user_not_found : 2001,
        user_is_blocked : 2002,
        invalid_credentials : 2003,
        invalid_otp : 2004,
        same_password : 2005,
        incorrect_current_password : 2006,
        token_missing : 2007,
        authentication_failed : 2008,
        product_not_found : 3001,
        empty_cart : 3002
    },
    user_type : {
        admin : "admin",
        user : "user"
    },
    success_message : {
        registered_successfully : "Registered successfully",
        logged_in_successfully : "Logged in successfully",
        activated_successfully : "Yo have successfully activated your account, now you can login",
        empty_cart : "Cart is empty",
        product_added_in_cart : "Product added in cart successfully",
        product_removed_from_cart : "Product removed from cart successfully",
        order_placed_successfully: "Order placed successfully",
        order_not_found: "Order not found"
    }

};

module.exports = constants;