Template.register.events({
    'click #register-button': function(e, t) {
        e.preventDefault();
        // Retrieve the input field values
        var email = $('#email').val(),
            firstName = $('#first-name').val(),
            lastName = $('#last-name').val(),
            password = $('#password').val(),
            passwordAgain = $('#password-again').val(),
            phoneNumber = $('#phone-number').val(),
            zipCode = $('#zipcode').val()
            ;

        // Trim Helper
        var trimInput = function(val) {
            return val.replace(/^\s*|\s*$/g, "");
        }
        var email = trimInput(email);

        // Check password is at least 6 chars long
        var isValidPassword = function(pwd, pwd2) {
            if (pwd === pwd2) {
                return pwd.length >= 6 ? true : false;
            } else {
                return swal({
                    title: "Passwords don't match",
                    text: "Please try again",
                    showConfirmButton: true,
                    type: "error"
                });
            }
        }

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        if (isValidPassword(password, passwordAgain)) {
            Accounts.createUser({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                phoneNumber: phoneNumber,
                zipCode: zipCode
            }, function(error) {
                if (error) {
                    return swal({
                        title: error.reason,
                        text: "Please try again",
                        showConfirmButton: true,
                        type: "error"
                    });
                } else {
                    FlowRouter.go('/registration-completed');
                }
            });
        }

        return false;
    }
});

Template.fblogin.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            console.log('Template.login.events #facebook-login START!');
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            } else {
                FlowRouter.go('/');
            }
        });
    },

    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            } else {
                FlowRouter.go('/');
            }
        })
    }
});