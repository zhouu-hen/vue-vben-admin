<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增器材 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <PlaceModal ref="placeModalRef" @reload="reload"></PlaceModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getEquipList, deleteEquipById } from '/@/api/equip';

  import PlaceModal from './PlaceModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { columns, searchFormSchema } from './role.data';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, TableAction, PlaceModal },
    setup() {
      const { createMessage } = useMessage();
      const [registerTable, { reload }] = useTable({
        title: '器材列表',
        api: getEquipList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      const placeModalRef = ref<null | InstanceType<typeof PlaceModal>>(null);

      function handleCreate() {
        placeModalRef.value?.openModal();
      }

      function handleEdit(record: Recordable) {
        placeModalRef.value?.editPlaceModal(record);
      }

      async function handleDelete(record: Recordable) {
        await deleteEquipById({ id: record.id });
        createMessage.success(`删除器材成功${record.name}`);
        handleSuccess();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        placeModalRef,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        reload,
      };
    },
  });
</script>
