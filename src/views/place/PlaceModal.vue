<template>
  <BasicModal @register="modalRegister" title="场地信息" width="800px" @ok="ok" @cancel="cancel">
    <a-row :gutter="24">
      <a-col :span="14">
        <BasicForm @register="formRegister" />
      </a-col>
      <a-col :span="10">
        <div class="change-avatar">
          <div class="mb-2">场馆照片</div>
          <CropperAvatar
            :uploadApi="uploadApi"
            :value="editForm.photo || headerImg"
            btnText="上传照片"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="150"
          />
        </div>
      </a-col>
    </a-row>
  </BasicModal>
</template>

<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { defineComponent, nextTick, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { formSchema } from './role.data';
  import { uploadApi } from '/@/api/sys/upload';
  import { addPlace } from '/@/api/place';

  export default defineComponent({
    components: {
      BasicModal,
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
      CropperAvatar,
    },
    setup(props, { emit }) {
      let headerImg = 'http://localhost:2001/uploads/1674028548134.png';
      const { createMessage } = useMessage();
      const [modalRegister, { openModal, closeModal }] = useModal();
      const [formRegister, { setFieldsValue, validate, getFieldsValue, resetFields }] = useForm({
        labelWidth: 120,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      function updateAvatar({ data }) {
        headerImg = data;
        if (editForm.value.photo) editForm.value.photo = data;
      }

      let editForm: any = ref({ photo: '' });
      const ok = async () => {
        await validate();
        const Placeform = {
          ...getFieldsValue(),
          photo: editForm.value.photo || headerImg,
          id: editForm.value.id || '',
        };

        const ret = await addPlace(Placeform);
        if (ret.code === 0) {
          createMessage.success('添加场地成功');
          closeModal();
          emit('reload');
        }
      };

      const cancel = async () => {
        emit('reload');
      };

      const editPlaceModal = (data) => {
        editForm.value = data;
        openModal();
        nextTick(() => {
          setFieldsValue(data);
        });
      };
      const initPlaceModal = () => {
        openModal();
        nextTick(() => {
          editForm.value.photo = 'http://localhost:2001/uploads/1674028548134.png';
          resetFields();
        });
      };

      return {
        headerImg,
        modalRegister,
        uploadApi: uploadApi as any,
        updateAvatar,
        formRegister,
        ok,
        cancel,
        editPlaceModal,
        initPlaceModal,
        openModal,
        closeModal,
        editForm,
      };
    },
  });
</script>
