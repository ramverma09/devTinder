#DevTinder APIS


authRouter
-Post / signup
-Post /login
-Post /logout

ProfileRoutern
-Get /profile/view
-Patch /profile/edit
-Patch /profile/password

connectionReqest Router
-Post / request/send/intrested/ :userId
-Post / request/send/ignore/ :userId
-Post / request/review/acccepted/:requestId
-Post / request/review/rejected/:requestId

userRouter
-Get /user/connections
-Get /user/requests
-Get /feed  -> Gets you to profile of other users 

Status : ignore, intrested, accepted , rejected