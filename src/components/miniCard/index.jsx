import React, { memo } from "react";
import logo from "@/assets/img/logo.png";
import { Card, Image, message } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { deleteCategory } from "@/service/modules/category";
const { Meta } = Card;
const MiniCard = memo(
  ({ cover, title, description, permission, id, getListCallback,editCallback }) => {
    const dealHtml = (val) => {
      return <div dangerouslySetInnerHTML={{ __html: val }}></div>;
    };
    return (
      <div className="inline-block">
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<Image className="ml-10" width={150} height={150} src={cover} preview={false}></Image>}
          actions={
            permission
              ? [
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" onClick={()=>editCallback(title,cover)}/>,
                  <DeleteOutlined
                    key="ellipsis"
                    onClick={() => {
                      deleteCategory(id)
                        .then((res) => {
                          message.success("删除成功！");
                          getListCallback();
                        })
                        .catch((err) => {
                          message.error(err.response?.data?.message);
                        });
                    }}
                  />,
                ]
              : []
          }
        >
          <Meta
            title={<span className="ml-14">{title}</span>}
            description={description ? dealHtml(description) : ""}
          ></Meta>
        </Card>
      </div>
    );
  }
);

export default MiniCard;
