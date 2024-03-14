<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Response;
use App\Http\Requests\CategoryStoreRequest;

class CategoryController extends Controller
{
    public function store(CategoryStoreRequest $request)
    {
        $image = $request->file('image');
        $name = time().'.'.$image->getClientOriginalExtension();
        $destinationPath = public_path('/images/categories');
        $image->move($destinationPath,$name);

        $category = new Category;
        $category->title = $request->title;
        $category->description = $request->description;
        $category->image = $name;
        $category->save();

        if($category){
            return Response::json([
                'status' => '200',
                'message' => 'category data has been saved'
            ], 200);
        }
    }
    
    public function update(Request $request,Category $category)
    {
        $image = $request->file('image');

        if ($image != null) {
            $name = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/images/categories');
            $image->move($destinationPath,$name);
        } else {
            $name = null;
        }
        
        
        $category->title = $request->title;
        $category->description = $request->description;
        $category->status = $request->status;
        if ($name != null) {
            $category->image = $name;
        }
        
        
        $category->update();

        if($category){
            return Response::json([
                'status' => '200',
                'message' => 'category data has been updated'
            ], 200);
        }
    }

    public function categories(){

        $category = Category::orderBy('id', 'desc')->get();
        if($category){
            return Response::json([
                'status' => '200',
                'message' => 'Category list get successfully',
                'data' => $category
            ], 200);
        }else{
            return Response::json([
                'status' => '404',
                'message' => 'Category data not found'
            ], 404);
        }
    }

    public function categorie_act()
    {
        $category = Category::where('status', 1)->orderBy('title', 'asc')->get();
        if($category){
            return Response::json([
                'status' => '200',
                'message' => 'Category list get successfully',
                'data' => $category
            ], 200);
        }else{
            return Response::json([
                'status' => '404',
                'message' => 'Category data not found'
            ], 404);
        }
    }

    public function categorie($id){
        
        $category = Category::find($id);
        if($category){
            return Response::json([
                'status' => '200',
                'message' => 'Category get successfully',
                'data' => $category
            ], 200);
        }else{
            return Response::json([
                'status' => '404',
                'message' => 'Category data not found'
            ], 404);
        }
    }

    public function category_delete(Category $category)
    {
        $category->delete();
        if($category){
            return Response::json([
                'status' => '200',
                'message' => 'Category deleted successfully'
            ], 200);
        }else{
            return Response::json([
                'status' => '401',
                'message' => 'Category has been not deleted'
            ], 401);
        }

    }


}
