#!bin/bash
ionic cordova build android --prod --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore /Users/uparupa/majikiti/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 /Users/uparupa/majikiti/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk verion1.apk
