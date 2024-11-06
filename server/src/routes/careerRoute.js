import express from 'express';
import {
    createCareerAdvice,
    getAllCareerAdvice,
    getCareerAdviceByTitle,
    updateCareerAdvice,
    deleteCareerAdvice,
    addComment,
    rateCareerAdvice,
    getCareerAdviceByCategoryIAT,
    getCareerAdviceByCategory,
    addContentObject ,
    getContentByCategory 
} from '../controllers/careerController.js';

const router = express.Router();

router.post('/', createCareerAdvice);
router.get('/', getAllCareerAdvice);
router.post('/byTitleCareer', getCareerAdviceByTitle);
router.put('/:id', updateCareerAdvice);
router.delete('/:id', deleteCareerAdvice);
router.post('/:id/comments', addComment);
router.post('/:id/ratings', rateCareerAdvice);
router.get('/category/:category', getCareerAdviceByCategory);
router.get('/imageandtitle', getCareerAdviceByCategoryIAT);

router.post('/addContentObject', addContentObject);
router.get('/content', getContentByCategory);


export default router;





