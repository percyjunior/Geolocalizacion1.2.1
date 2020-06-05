Meteor.methods({
    getFirebaseToken: function (userId) {

        if (!userId) {
            throw new Meteor.Error("not-logged-in",
                "Must be logged in to enter chat.");
        }

        var FirebaseTokenGenerator = Meteor.npmRequire("firebase-token-generator");
        var tokenGenerator = new FirebaseTokenGenerator(YOUR_FIREBASE_SECRET);
        var token = tokenGenerator.createToken({uid: userId});

        return {"token":token};
    }
});