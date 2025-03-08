const express = require("express");
const router = express.Router();

const FollowsModel = require("../model/follows");
const MessModel = require("../model/messages");

router.all("/", (req, res) => {
  res.send("关注和分析API");
});
// 关注、取消关注接口
router.post("/toggle", async (req, res, next) => {
  let body = req.body;
  try {
    let { user_id, fans_id } = body;
    if (!user_id || !fans_id) {
      return res.status(400).send({ message: "参数缺失" });
    }
    let action = "delete";
    let result = await FollowsModel.findOneAndDelete(body);
    if (!result) {
      action = "create";
      result = await FollowsModel.create(body);
      await MessModel.create({
        source_id: result._id,
        type: 3,
        user_id,
      });
    }
    res.send({
      action,
      message: action == "create" ? "关注成功" : "取消关注成功",
    });
  } catch (err) {
    next(err);
  }
});
// 获取关注列表
router.get("/list/:id", async (req, res, next) => {
  let user_id = req.auth._id;
  let { per_page, page } = req.query;
  try {
    per_page = +per_page || 10;
    page = +page || 1;
    let skip = (page - 1) * per_page;
    let where = { user_id: ObjectId(user_id) };
    let total = await FollowsModel.count(where);
    let result = await FollowsModel.aggregate([
      {
        $match: where,
      },
      {
        $lookup: {
          from: "users",
          localField: "fans_id",
          foreignField: "_id",
          as: "fans_info",
        },
      },
      {
        $lookup: {
          from: "follows",
          let: {
            uid: "$user_id",
            fid: "$fans_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$user_id", "$$fid"] },
                    { $eq: ["$fans_id", "$$uid"] },
                  ],
                },
              },
            },
          ],
          as: "is_follow",
        },
      },
      {
        $addFields: {
          fans_info: {
            $first: "$fans_info",
          },
          is_follow: {
            $gt: [{ $size: "$is_follow" }, 0],
          },
        },
      },
      {
        $unset: [
          "fans_info.__v",
          "fans_info.password",
          "fans_info.company",
          "fans_info.good_num",
          "fans_info.jue_power",
          "fans_info.read_num",
        ],
      },
      { $skip: skip },
      {
        $limit: per_page,
      },
    ]);
    await MessModel.updateMany(
      {
        status: 0,
        type: 3,
        user_id,
      },
      {
        status: 1,
      }
    );
    res.send({
      meta: {
        total,
        page,
        per_page,
      },
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
