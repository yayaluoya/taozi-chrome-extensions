import { request, getDscToken } from "./request";
import type { MyWorktableCommonRes } from "./type";

/**
 * 获取我的工作台公共信息
 * @returns
 */
export const get_my_worktable_common = async () => {
  const dsc_token = await getDscToken();
  return request<MyWorktableCommonRes>("/api/my_worktable/my_worktable/get_my_worktable_common", {
    method: "post",
    body: JSON.stringify({
      exclude_workspace_ids: [],
      select_object_types: ["story", "task", "bug"],
      need_view_config: false,
      need_setting: false,
      dsc_token
    })
  });
};
