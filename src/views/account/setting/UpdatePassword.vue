<template>
  <BasicModal
    @register="register"
    v-bind="$attrs"
    title="Modal Title"
    :helpMessage="['提示1', '提示2']"
    width="700px"
    @ok="submitPassword"
  >
    <Form :model="formData" :rules="rules" ref="formRef">
      <FormItem name="oldPass" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.oldPass"
          placeholder="旧密码"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem name="checkPass" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.checkPass"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>
    </Form>
  </BasicModal>
</template>

<script lang="ts" setup>
  import type { Rule } from 'ant-design-vue/es/form';
  import { reactive, defineExpose, ref } from 'vue';
  import { Form, Input } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { updatePassword } from '/@/api/sys/user';
  const { t } = useI18n();
  const { createMessage } = useMessage();
  const FormItem = Form.Item;
  const InputPassword = Input.Password;

  const formRef = ref();
  let validatePass = async (_rule: Rule, value: string) => {
    if (value === '') return Promise.reject('请输入新密码');
    else if (value == formData.oldPass) return Promise.reject('新密码不能与旧密码相同');
    else if (value.length < 5) return Promise.reject('密码长度最少五位');
    else {
      if (formData.checkPass !== '') formRef.value.validateFields('checkPass');
      return Promise.resolve();
    }
  };
  let validatePass2 = async (_rule: Rule, value: string) => {
    if (value === '') return Promise.reject('请再次输入密码');
    else if (value !== formData.password) return Promise.reject('两次输入密码不一致！');
    else return Promise.resolve();
  };
  const [register, { openModal, closeModal }] = useModal();
  const formData = reactive({
    oldPass: '',
    password: '',
    checkPass: '',
  });
  const rules: Record<string, Rule[]> = {
    oldPass: [
      { required: true, trigger: 'change', message: '必填项！' },
      { min: 5, trigger: 'change', message: '密码长度最少五位' },
    ],
    password: [{ required: true, validator: validatePass, trigger: 'change' }],
    checkPass: [{ validator: validatePass2, trigger: 'change' }],
  };
  const submitPassword = async () => {
    const data = await formRef.value.validate();
    if (!data) return createMessage.error('密码表单未填写完整');

    try {
      const ret = await updatePassword({ oldPwd: formData.oldPass, newPwd: formData.password });
      if (ret.code === 0) {
        closeModal();
        createMessage.success('修改密码成功');
      }
    } catch (error: any) {
      createMessage.error(error.message);
    }
  };
  defineExpose({ openModal, closeModal });
</script>
