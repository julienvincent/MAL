

const SAVE_STATE = async ({action, viewer}) => {
   if (!viewer.authenticated) {
      return {
         type: "AUTH_ERROR",
         payload: {
            message: "You are not authorized to perform this operation"
         },
         status: 401
      }
   }


}

module.exports = {
   SAVE_STATE
}