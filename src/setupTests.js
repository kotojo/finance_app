const firebase = {
  auth: jest.fn().mockImplementation(() => {
    return {
      currentUser: {
        uid: '1293xcvad91'
      },
      onAuthStateChanged: jest.fn()
    }
  })
}

global.firebase = firebase
