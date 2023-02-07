import {
  Descriptions,
  Tooltip,
  Avatar,
  Input,
  Form,
  Button,
  Col,
  Space,
  message,
  Modal,
} from "antd";
import React, { memo, useEffect, useState, createElement } from "react";
import { useLocation } from "react-router-dom";
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Comment } from "@ant-design/compatible";
import {
  addOneComment,
  getOneArticleCommentList,
  replyOneComment,
  addZan,
} from "@/service/modules/article";
import dayjs from "dayjs";
import { isEmpty } from "lodash-es";
const { TextArea } = Input;
const ArticleDetail = memo(() => {
  const location = useLocation();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [value, setValue] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [visibile, setVisibile] = useState(false);
  const [visibile2, setVisibile2] = useState(false);
  const [commentId, setCommentId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [commentContent, setCommentContent] = useState("");
  const [commentReply, setCommentReply] = useState("");
  const info = useSelector((state) => state.userInfoList.info);
  useEffect(() => {
    getOneArticleCommentList(location.state.detail.id).then((res) => {
      setCommentList(res.data?.data[0].comment);
    });
    // console.log(location.state);
  }, []);
  const like = (commentId, likeList = []) => {
    if (likeList.some((reply) => info.id === reply.userId)) {
      console.log("---------");
      message.warning("你已经点赞过了");
      return;
    }
    addZan(commentId, info.id).then((res) => {
      if (res.data.data.code === 200) {
        message.success("点赞成功!");
        getOneArticleCommentList(location.state.detail.id).then((res) => {
          setCommentList(res.data?.data[0].comment);
        });
      }
    });
    setDislikes(0);
    // setAction("liked");
  };
  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    // setAction("disliked");
  };
  const handleComment = () => {
    if (value.length === 0) {
      message.error("请输入评论信息");
      return;
    } else {
      addOneComment({
        userId: info.id,
        articleId: location.state?.detail?.id,
        content: value,
      })
        .then((res) => {
          if (res.data.data.code === 200) {
            message.success("评论成功！");
            setValue("");
            getOneArticleCommentList(location.state.detail.id).then((res) => {
              setCommentList(res.data?.data[0].comment);
            });
          }
          // console.log(res);
        })
        .catch((err) => {
          message.error(JSON.stringify(err));
        });
    }
  };
  const replaySomeOne = (commentId, userID) => {
    setVisibile(true);
    setCommentId(commentId);
    // setUserId(userID);
  };
  const handleReply = () => {
    replyOneComment({
      commentId,
      userId: info.id,
      replyContent: commentContent,
    }).then((res) => {
      if (res.data.data.code === 200) {
        message.success("评论成功!");
        setVisibile(false);
        getOneArticleCommentList(location.state.detail.id).then((res) => {
          setCommentList(res.data?.data[0].comment);
        });
      }
    });
  };
  return (
    <div>
      <Descriptions title={location.state?.detail?.title}>
        <Descriptions.Item label={"所属分类"}>
          {location.state.detail?.category.name}
        </Descriptions.Item>
      </Descriptions>
      <div
        dangerouslySetInnerHTML={{ __html: location.state.detail?.content }}
      ></div>
      {(commentList || []).map((item, index) => {
        if (item.Reply.length > 0) {
          return (
            <Comment
              actions={[
                <Tooltip key="comment-basic-like" title="Like">
                  <span onClick={() => like(item.id, item.likeList)}>
                    {createElement(
                      item.likeList.some((infos) => infos.userId === info.id)
                        ? LikeFilled
                        : LikeOutlined
                    )}
                    <span className="comment-action">
                      {item.likeList.length}
                    </span>
                  </span>
                </Tooltip>,
                // <Tooltip key="comment-basic-dislike" title="Dislike">
                //   <span onClick={dislike}>
                //     {React.createElement (
                //       action === "disliked" ? DislikeFilled : DislikeOutlined
                //     )}
                //     <span className="comment-action">{item.disLike}</span>
                //   </span>
                // </Tooltip>,
                <span
                  key="comment-basic-reply-to"
                  onClick={() => replaySomeOne(item.id, item.userId)}
                >
                  回复
                </span>,
              ]}
              author={<a>{item?.userInfo.email}</a>}
              avatar={
                <Avatar
                  src={item?.userInfo?.avatar}
                  alt={item?.userInfo.email}
                />
              }
              content={<p>{item.content}</p>}
              datetime={
                <Tooltip
                  title={dayjs(item.createAt).format("YYYY-MM-DD:hh:mm:ss")}
                >
                  <span>
                    {dayjs(item.createAt).format("YYYY-MM-DD:hh:mm:ss")}
                  </span>
                </Tooltip>
              }
            >
              {(item.Reply || []).map((reply, i) => (
                <Comment
                  actions={[
                    <span
                      key="comment-basic-reply-to"
                      onClick={() => replaySomeOne(reply.commentId, reply.id)}
                    >
                      回复
                    </span>,
                  ]}
                  author={<a>{reply?.user.email}</a>}
                  avatar={
                    <Avatar
                      src={reply?.user?.avatar}
                      alt={reply?.user?.email}
                    />
                  }
                  content={<p>{reply?.replyContent}</p>}
                  datetime={
                    <Tooltip
                      title={dayjs(reply?.createAt).format(
                        "YYYY-MM-DD:hh:mm:ss"
                      )}
                    >
                      <span>
                        {dayjs(reply?.createAt).format("YYYY-MM-DD:hh:mm:ss")}
                      </span>
                    </Tooltip>
                  }
                />
              ))}
            </Comment>
          );
        } else {
          return (
            <Comment
              actions={[
                <Tooltip key="comment-basic-like" title="Like">
                  <span onClick={() => like(item.id, item.likeList)}>
                    {createElement(
                      action === "liked" ? LikeFilled : LikeOutlined
                    )}
                    <span className="comment-action">
                      {item.likeList.length}
                    </span>
                  </span>
                </Tooltip>,
                <Tooltip key="comment-basic-dislike" title="Dislike">
                  <span onClick={dislike}>
                    {React.createElement(
                      action === "disliked" ? DislikeFilled : DislikeOutlined
                    )}
                    <span className="comment-action">{item.disLike}</span>
                  </span>
                </Tooltip>,
                <span
                  key="comment-basic-reply-to"
                  onClick={() => replaySomeOne(item.id, item.userId)}
                >
                  Reply to
                </span>,
              ]}
              author={<a>{item?.userInfo.email}</a>}
              avatar={
                <Avatar src={item.userInfo.avatar} alt={item?.userInfo.email} />
              }
              content={<p>{item.content}</p>}
              datetime={
                <Tooltip
                  title={dayjs(item.createAt).format("YYYY-MM-DD:hh:mm:ss")}
                >
                  <span>
                    {dayjs(item.createAt).format("YYYY-MM-DD:hh:mm:ss")}
                  </span>
                </Tooltip>
              }
            />
          );
        }
      })}
      {/* <div className="absolute bottom-0"> */}
      <Comment
        avatar={
          <Avatar
            src={info.avatar}
            icon={info?.avatar ? <UserOutlined></UserOutlined> : ""}
            alt={info.email}
          />
        }
        content={
          <Col span={24}>
            <Space className="w-full">
              <TextArea
                value={value}
                style={{ width: "1280px", height: "100px" }}
                onChange={(e) => setValue(e.target.value)}
              ></TextArea>
              <Button type="primary" onClick={handleComment}>
                提交
              </Button>
            </Space>
          </Col>
        }
      />
      <Modal
        open={visibile}
        onCancel={() => {
          setCommentId(null);
          setVisibile(false);
          setCommentContent("");
        }}
        onOk={handleReply}
        title={"回复ta"}
      >
        <Input
          placeholder="输入您的评论"
          value={commentContent}
          onChange={(val) => setCommentContent(val.target.value)}
        ></Input>
      </Modal>
      <Modal
        open={visibile2}
        onCancel={() => {
          setCommentId(null);
          setVisibile(false);
          setCommentContent("");
        }}
        onOk={handleReply}
        title={"回复ta"}
      >
        <Input
          placeholder="输入您的回复"
          value={commentContent}
          onChange={(val) => setCommentReply(val.target.value)}
        ></Input>
      </Modal>
    </div>
  );
});

export default ArticleDetail;
