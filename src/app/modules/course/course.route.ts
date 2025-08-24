import express from "express";

const router = express.Router();

// For admin only
// router.post(
//   "/add-course",
//   multerUpload.single("file"),
//   auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
//   authorizeRoute(),
//   CourseControllers.addCourse
// );

// router.get("/", CourseControllers.getAllCourses);
// router.get("/:courseId", CourseControllers.getSingleCourseById);

// router.put(
//   "/:courseId",
//   multerUpload.single("file"),
//   auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
//   authorizeRoute(),
//   CourseControllers.updateCourse
// );

// router.delete(
//   "/:courseId",
//   auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
//   authorizeRoute(),
//   CourseControllers.deleteCourse
// );

export const CourseRoutes = router;
