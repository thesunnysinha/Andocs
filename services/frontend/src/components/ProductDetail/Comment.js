import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import {
  Grid,
  Typography,
  Modal,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import StarRatings from "react-star-ratings";
import {
  useFetchProductCommentQuery,
  useFetchProductDetailQuery,
} from "../../services/fetchProduct";
import { getToken } from "../../services/LocalStorageService";
import EditComment from "./EditComment";

const Comment = (props) => {
  const styles = {
    paper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "2rem",
    },
  };
  const { access_token } = getToken();
  const { id } = useParams();
  const { data, isSuccess, error } = useFetchProductCommentQuery(id);
  const [comments, setComments] = useState([]);
  const { product_id } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComments = comments.slice(indexOfFirstItem, indexOfLastItem);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(comments.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [openAddComment, setOpenAddComment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const handleOpenAddComment = (product_id) => {
    setSelectedProduct(product_id);
    setOpenAddComment(true);
  };
  const handleCloseAddComment = () => {
    setOpenAddComment(false);
  };

  const [openEditComment, setOpenEditComment] = useState(false);
  const [selectedEditComment, setSelectedEditComment] = useState({});
  const handleOpenEditComment = (comment) => {
    setSelectedEditComment(comment);
    setOpenEditComment(true);
  };
  const handleCloseEditComment = () => {
    setOpenEditComment(false);
  };

  useEffect(() => {
    if (data && isSuccess) {
      setComments(data);
    }
  }, [data, isSuccess]);

  useMemo(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const { refetch: reFetchComment } = useFetchProductCommentQuery(id);
  const { refetch: reFetchProductDetail } = useFetchProductDetailQuery(id);

  const handleCommentEdited = () => {
    reFetchComment();
    reFetchProductDetail();
  };

  return (
    <div className="comment-section">
      <Modal open={openAddComment} onClose={handleCloseAddComment}>
        <div style={styles.paper}>
          <CommentForm
            product_id={selectedProduct}
            handleCloseAddComment={handleCloseAddComment}
            onCommentEdited={handleCommentEdited}
          />
        </div>
      </Modal>
      <Menu
        id="sort-menu"
        anchorEl={sortAnchorEl}
        keepMounted
        open={Boolean(sortAnchorEl)}
        onClose={handleSortClose}
      >
        <MenuItem onClick={handleSortClose}>
          <ListItemText>Most Recent</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleSortClose}>
          <ListItemText>Top Comments</ListItemText>
        </MenuItem>
      </Menu>
      <Modal open={openEditComment} onClose={handleCloseEditComment}>
        <div style={styles.paper}>
          <EditComment
            comment={selectedEditComment}
            handleCloseEditComment={handleCloseEditComment}
            onCommentEdited={handleCommentEdited}
          />
        </div>
      </Modal>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
          {access_token ? (
            <>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenAddComment(product_id)}
                >
                  Add Review
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="h5" gutterBottom>
              Login In to Add Reviews
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
          <Box mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSortClick}
            >
              <Typography variant="body1">Sort By :- </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider />

      <Grid container>
        <Grid item xs={12} sx={{ textAlign: "center", margin: "1rem 0" }}>
          <Typography variant="h4" gutterBottom>
            Reviews ({comments.length})
          </Typography>
        </Grid>
      </Grid>
      {currentComments.map((comment) => (
        <Grid
          container
          spacing={2}
          key={comment.id}
          sx={{ textAlign: "center" }}
        >
          <Grid item xs={12} md={3}>
            <Typography variant="h6">{comment.user_name}</Typography>
            <StarRatings
              rating={comment.rating}
              starRatedColor="#FAC917"
              starEmptyColor="#C4C4C4"
              starHoverColor="#FAC917"
              starDimension="25px"
              starSpacing="0px"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">
              <strong>Subject:</strong> {comment.subject}
            </Typography>
            <Typography variant="subtitle2">
              <strong>Status:</strong> {comment.status}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {comment.comment}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">
              <strong>Posted by:</strong> {comment.name}
            </Typography>
            <Typography variant="subtitle2">
              <small>Created At:</small> {comment.created_date}{" "}
              {comment.created_time}
            </Typography>
            <Typography variant="subtitle2">
              <small>Updated At:</small> {comment.updated_date}{" "}
              {comment.updated_time}
            </Typography>
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleOpenEditComment(comment)}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      ))}

      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <div className="pagination-center">
            <Box mt={2}>
              <Grid container justify="center">
                {pageNumbers.map((number) => (
                  <Button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={currentPage === number ? "selected-page" : ""}
                  >
                    {number}
                  </Button>
                ))}
              </Grid>
            </Box>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Comment;

// import React, { useState, useEffect, useMemo } from "react";
// import { useParams } from "react-router-dom";
// import CommentForm from "./CommentForm";
// import {
//   Grid,
//   Typography,
//   Modal,
//   Box,
//   Button,
//   Divider,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import StarRatings from "react-star-ratings";
// import {
//   useFetchProductCommentQuery,
//   useFetchProductDetailQuery,
// } from "../../services/fetchProduct";
// import { getToken } from "../../services/LocalStorageService";
// import EditComment from "./EditComment";

// const Comment = (props) => {
//   const styles = {
//     paper: {
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       backgroundColor: "white",
//       padding: "2rem",
//     },
//   };
//   const { access_token } = getToken();
//   const { id } = useParams();
//   const { data, isSuccess, error } = useFetchProductCommentQuery(id);
//   const [comments, setComments] = useState([]);
//   const [sortOption, setSortOption] = useState("mostRecent");
//   const { product_id } = props;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const sortedComments = useMemo(() => {
//     if (sortOption === "highToLow") {
//       return comments.sort((a, b) => b.rating - a.rating);
//     } else if (sortOption === "lowToHigh") {
//       return comments.sort((a, b) => a.rating - b.rating);
//     } else {
//       return comments.sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );
//     }
//   }, [sortOption, comments]);
//   const currentComments = sortedComments.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(sortedComments.length / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   const [openAddComment, setOpenAddComment] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState({});
//   const handleOpenAddComment = (product_id) => {
//     setSelectedProduct(product_id);
//     setOpenAddComment(true);
//   };
//   const handleCloseAddComment = () => {
//     setOpenAddComment(false);
//   };

//   const [openEditComment, setOpenEditComment] = useState(false);
//   const [selectedEditComment, setSelectedEditComment] = useState({});
//   const handleOpenEditComment = (comment) => {
//     setSelectedEditComment(comment);
//     setOpenEditComment(true);
//   };
//   const handleCloseEditComment = () => {
//     setOpenEditComment(false);
//   };

//   useEffect(() => {
//     if (data && isSuccess) {
//       setComments(data);
//     }
//   }, [data, isSuccess]);

//   useMemo(() => {
//     if (error) {
//       console.error(error);
//     }
//   }, [error]);

//   const { refetch: reFetchComment } = useFetchProductCommentQuery(id);
//   const { refetch: reFetchProductDetail } = useFetchProductDetailQuery(id);

//   const handleCommentEdited = () => {
//     reFetchComment();
//     reFetchProductDetail();
//   };

//   const handleSortOptionChange = (event) => {
//     setSortOption(event.target.value);
//     setCurrentPage(1);
//   };

//   return (
//     <div className="comment-section">
//       <Modal open={openAddComment} onClose={handleCloseAddComment}>
//         <div style={styles.paper}>
//           <CommentForm
//             product_id={selectedProduct}
//             handleClose={handleCloseAddComment}
//           />
//         </div>
//       </Modal>
//       <Modal open={openEditComment} onClose={handleCloseEditComment}>
//         <div style={styles.paper}>
//           <EditComment
//             comment={selectedEditComment}
//             handleClose={handleCloseEditComment}
//             handleCommentEdited={handleCommentEdited}
//           />
//         </div>
//       </Modal>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6">Comments</Typography>
//         </Grid>
//         <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleOpenAddComment(product_id)}
//           >
//             Add Comment
//           </Button>
//         </Grid>
//       </Grid>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="subtitle1">
//               {sortedComments.length} reviews
//             </Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Box sx={{ mt: 2 }}>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Typography variant="subtitle1">Sort By:</Typography>
//               <Box sx={{ ml: 2 }}>
//                 <Menu
//                   anchorEl={null}
//                   open={Boolean(sortOption)}
//                   onClose={() => setSortOption(null)}
//                   anchorOrigin={{
//                     vertical: "bottom",
//                     horizontal: "left",
//                   }}
//                   transformOrigin={{
//                     vertical: "top",
//                     horizontal: "left",
//                   }}
//                 >
//                   <MenuItem value="mostRecent" onClick={handleSortOptionChange}>
//                     Most Recent
//                   </MenuItem>
//                   <MenuItem value="highToLow" onClick={handleSortOptionChange}>
//                     Rating: High to Low
//                   </MenuItem>
//                   <MenuItem value="lowToHigh" onClick={handleSortOptionChange}>
//                     Rating: Low to High
//                   </MenuItem>
//                 </Menu>
//               </Box>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//       <Box sx={{ mt: 2 }}>
//         <Divider sx={{ my: 2 }} />
//         {currentComments.length > 0 ? (
//           currentComments.map((comment) => (
//             <Box key={comment.id} sx={{ mb: 2 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <StarRatings
//                       rating={comment.rating}
//                       starRatedColor="#ffc107"
//                       starDimension="20px"
//                       starSpacing="2px"
//                     />
//                     <Typography variant="body1" sx={{ ml: 1 }}>
//                       {comment.name}
//                     </Typography>
//                   </Box>
//                   <Typography variant="subtitle1">
//                     <strong>{comment.subject}</strong>
//                   </Typography>
//                   <Typography variant="subtitle2">{comment.comment}</Typography>
//                 </Grid>
//                 <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
//                   {access_token && comment.user.id === props.userId && (
//                     <>
//                       <Button
//                         variant="outlined"
//                         color="primary"
//                         onClick={() => handleOpenEditComment(comment)}
//                       >
//                         Edit
//                       </Button>
//                     </>
//                   )}
//                   <Typography variant="subtitle2">
//                     <strong>Created At: </strong>
//                     {comment.created_date} {comment.created_time}
//                   </Typography>
//                   <Typography variant="subtitle2">
//                     <strong>Updated At: </strong>
//                     {comment.updated_date} {comment.updated_time}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Box>
//           ))
//         ) : (
//           <Typography variant="subtitle2">No comments available</Typography>
//         )}

//         {pageNumbers.length > 1 && (
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//             {pageNumbers.map((number) => (
//               <Button
//                 key={number}
//                 variant="text"
//                 onClick={() => handlePageChange(number)}
//               >
//                 {number}
//               </Button>
//             ))}
//           </Box>
//         )}
//       </Box>
//     </div>
//   );
// };
// export default Comment;
