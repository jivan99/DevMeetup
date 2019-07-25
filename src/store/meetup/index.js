import * as firebase from 'firebase';

export default {
  state: {
    loadedMeetups: [],
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
      if (payload.time) {
        meetup.time = payload.time;
      }
    },
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    }
  },
  actions: {
    loadMeetups({ commit }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('meetups')
        .once('value')
        .then(data => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              time: obj[key].time,
              creatorId: obj[key].creatorId,
            });
          }
          commit('setLoading', false);
          commit('setLoadedMeetups', meetups);
        })
        .catch(error => {
          commit('setLoading', false);
          console.log(error);
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        time: payload.time,
        creatorId: getters.getUser.id,
      };
      let imageUrl, key;
      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then(data => {
          key = data.key;
          return key;
        })
        .then(key => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          return firebase
            .storage()
            .ref('meetups/' + key + '.' + ext)
            .put(payload.image);
        })
        .then(fileData => {
          return fileData.ref.getDownloadURL();
        })
        .then(url => {
          imageUrl = url;
          return firebase
            .database()
            .ref('meetups')
            .child(key)
            .update({ imageUrl: imageUrl });
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key,
          });
        })
        .catch(error => {
          console.log(error);
        });

      // Reach out to firebase and store it
    },
    updateMeetupData({ commit }, payload) {
      commit('setLoading', true);
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      if (payload.time) {
        updateObj.time = payload.time;
      }
      firebase
        .database()
        .ref('meetups')
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit('setLoading', false);
          commit('updateMeetup', payload);
        })
        .catch(error => {
          commit('setLoading', false);
          console.log(error);
        });
    },
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return meetupID => {
        return state.loadedMeetups.find(meetup => meetup.id === meetupID);
      };
    },
  },
};
