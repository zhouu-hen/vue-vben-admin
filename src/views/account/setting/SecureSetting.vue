<template>
  <CollapseContainer title="安全设置" :canExpan="false">
    <List>
      <template v-for="item in list" :key="item.key">
        <ListItem>
          <ListItemMeta>
            <template #title>
              {{ item.title }}
              <div class="extra" v-if="item.extra" @click="edit(item.key)">
                {{ item.extra }}
              </div>
            </template>
            <template #description>
              <div>{{ item.description }}</div>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </CollapseContainer>

  <UpdatePassword ref="passwordModal" />
</template>
<script lang="ts">
  import { List } from 'ant-design-vue';
  import { defineComponent, ref } from 'vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { secureSettingList } from './data';
  import UpdatePassword from './UpdatePassword.vue';

  export default defineComponent({
    setup() {
      const passwordModal = ref<null | InstanceType<typeof UpdatePassword>>(null);

      const edit = (key) => {
        switch (+key) {
          case 1:
            passwordModal.value?.openModal();
            break;

          default:
            break;
        }
      };

      return {
        edit,
        passwordModal,
        list: secureSettingList,
      };
    },
    components: {
      CollapseContainer,
      List,
      ListItem: List.Item,
      ListItemMeta: List.Item.Meta,
      UpdatePassword,
    },
  });
</script>
<style lang="less" scoped>
  .extra {
    float: right;
    margin-top: 10px;
    margin-right: 30px;
    font-weight: normal;
    color: #1890ff;
    cursor: pointer;
  }
</style>
