import * as types from "@/store/mutation-types";
import Vue from "vue";
import { handleError } from "@/utils/utils.js";
import { createProvider } from "../../vue-apollo";
import { gql } from "graphql-tag";

let apolloClient = createProvider().defaultClient;

const getters = {
  messages: (state) => state.messages,
  messageContents: (state) => state.messageContents,
};

const actions = {
  async getmessages({ commit },otherUsername) {
    commit(types.SHOW_LOADING, true);
    const resp = await apolloClient
        .query({
          query: gql`
            {
              allChat(otherUsername: "${otherUsername}") {
                content:message
                participantId: id
                timestamp: timestamp
                myself:readStatus
                user{
                  username
                }
                thread{
                  first{
                    id
                    username
                    profilePic
                  }
                  second{
                    id
                    username
                    profilePic
                  }
                }
              }  
            }
          `
      })
      .then((response) => {
        console.log("test------------------",response.data.allChat);
        commit(
          types.INQUIRE_A_MESSAGE,
          response.data.allChat
        );
        commit(types.SHOW_LOADING, false);
      })
      .catch((error) => {
        handleError(error, commit, resp);
      });
  },
}

const mutations = {
  [types.SAVE_ALL_MESSAGES](state, value) {
    state.messages = value;
  },
  [types.CREATE_A_MESSAGE](state, value) {
    var msg = {
      participants: value.participants,
      myself: value.myself,
      messageContent: [],
    };
    state.message = msg;
  },
  [types.INQUIRE_A_MESSAGE](state, value) {
    /* var msg = {
      participants: value.participants,
      myself: value.myself,
      messageContent: value.messageContent,
    }; */
    //state.message = msg;
    state.messages = value;
    console.log(state.messages,value,"INQUIRE_A_MESSAGE___________________INQUIRE_A_MESSAGE")
  },
  [types.PUSH_A_MESSAGE](state, value) {
    const i = state.messages.findIndex((p) => p.id == value.id);
    const messages = state.messages;
    if (i > -1) {
      messages[i] = value;
      Vue.set(state, "messages", [...messages]);
    } else {
      Vue.set(state, "messages", [...messages, value]);
    }
  },
};

const state = {
  messages: [],
  message: {},
};

export default {
  state,
  getters,
  mutations,
  actions,
};
