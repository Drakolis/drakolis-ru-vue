<template>
  <div class="messenger">
    <div v-scroll:throttle="{fn: onScroll, throttle: 0 }" class="sidebar">
      <v-list
        class="chatlist"
        shaped
        :two-line="settings.displayLastMessage"
      >
        <v-list-item v-for="chat in chats" :key="chat.id" @click="">
          <v-list-item-avatar>
            <v-avatar
              :color="selectColorByNumber(chat.id)"
            >
              <v-img
                v-if="chat.avatar"
                :src="chat.avatar"
                :alt="selectTwoLettersFromDisplayName(chat.displayName)"
              />
              <span v-else class="title">
                {{ selectTwoLettersFromDisplayName(chat.displayName) }}
              </span>
            </v-avatar>
            <v-avatar
              v-if="showBullhorn(chat)"
              color="darker"
              size="22"
              class="avatar-icon"
            >
              <v-icon small>
                mdi-bullhorn
              </v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ chat.displayName }}</v-list-item-title>
            <v-list-item-subtitle v-if="settings.displayLastMessage && chat.lastMessage">
              <span v-if="showMessageSender(chat)" class="text--primary">
                <span v-if="showMessageSenderAsYou(chat)">You:</span>
                <span v-else>{{ chat.lastMessage.from.firstName }}:</span>
              </span>
              {{ chat.lastMessage.text }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
import mock from '@/mock/chat.json';
import { selectColorByNumber } from '@/colors';

const infiniteScroll = {
  itemCount: 30,
  itemHeight: 56,
  itemPercent: 0.25,
  marginTop: 10,
  height: 678,

  totalPages: 10,
};

export default {
  data() {
    return {
      ...mock,
      pages: [],
      loadedPages: 1,
    };
  },
  mounted() {
    const pageLength = infiniteScroll.itemCount * infiniteScroll.itemHeight;
    for (let i = 0; i < infiniteScroll.totalPages; i += 1) {
      const bottom = (i) * pageLength
      + pageLength + infiniteScroll.marginTop
      - infiniteScroll.height;
      const top = (i - 1) * pageLength
      + pageLength * infiniteScroll.itemPercent + infiniteScroll.marginTop
      - infiniteScroll.height;
      this.pages.push({ top, bottom });
    }
  },
  methods: {
    selectColorByNumber,
    selectTwoLettersFromDisplayName(displayName) {
      const array = displayName.split(' ');
      const lastLetter = array.length > 1 ? array[array.length - 1][0] : '';
      return `${array[0][0]}${lastLetter}`.toLocaleUpperCase();
    },
    showMessageSenderAsYou(chat) {
      return chat.lastMessage.from.id === this.currentUser.id;
    },
    showMessageSender(chat) {
      return chat.type === 'group';
    },
    showBullhorn(chat) {
      return chat.type === 'channel';
    },
    onScroll(e, position) {
      console.log(this.loadedPages);
      console.log(this.chats.length);
      console.log(position.scrollTop);
      const page = this.currentPage(position.scrollTop);
      console.log(`${page}: ${this.pages[page].top} -> ${this.pages[page].bottom}`);

      if (this.loadedPages < page + 1) {
        this.chats = [...this.chats, ...mock.chats];
        this.loadedPages += 1;
      }
      if (this.loadedPages >= page + 1) {
        this.chats.splice((page + 1) * infiniteScroll.itemCount);
        this.loadedPages = Math.max(1, page);
      }
    },
    currentPage(scroll) {
      const epsilon = infiniteScroll.itemCount * infiniteScroll.itemHeight * infiniteScroll.itemPercent;
      return this.pages.findIndex(p => scroll > p.top + epsilon && scroll < p.bottom - epsilon);
    },
  },
};
</script>

<style scoped>
  .messenger {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .messenger .sidebar {
    background-color: rgba(0, 0, 0, 0.1);
    border: solid;
    border-width: 0 thin 0 0;
    border-color: rgba(255, 255, 255, 0.12);
    width: 300px;
    height: 100%;
    max-height: 100%;
    overflow: auto;
  }
  .messenger .sidebar .chatlist {
    background: none;
  }
  .messenger .viewport {
    flex-grow: 1;
    height: 100%;
  }
  .avatar-icon {
    position: absolute;
    right: -18px;
    bottom: -4px;
  }
</style>
