import express from "express";
import {
  getAllJutut,
  addNew,
  getYksJuttu,
  updateYksJuttu,
  deleteJuttu,
} from "../controllers/rahaController";

const rahaRouter = express.Router();

rahaRouter.get("/", getAllJutut);
rahaRouter.post("/", addNew);

rahaRouter.get("/:id", getYksJuttu);
rahaRouter.put("/:id", updateYksJuttu);
rahaRouter.delete("/:id", deleteJuttu);

export default rahaRouter;
