<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Response;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $product = new Product;
        $product->title = $request->title;
        $product->description = $request->description;
        $product->categories = $request->categories;
        $product->price = $request->price;
        $product->qty = $request->qty;
        $product->save();

        if($product){
            return Response::json([
                'status' => '200',
                'message' => 'product add successfully'
            ], 200);
        }else{
            return response()->json([
                'status' => '500',
                'message' => 'Failed to add product'
            ], 500);
        }
    }

    public function products()
    {
        $product = Product::orderBy('id', 'desc')->get();
        if($product){
            return Response::json([
                'status' => '200',
                'message' => 'Product list get successfully',
                'data' => $product
            ], 200);
        }else{
            return Response::json([
                'status' => '404',
                'message' => 'product data not found'
            ], 404);
        }
    }

    public function product($id){
        $product = Product::find($id);
        if($product){
            return Response::json([
                'status' => '200',
                'message' => 'product get successfully',
                'data' => $product
            ], 200);
        }else{
            return Response::json([
                'status' => '404',
                'message' => 'product data not found'
            ], 404);
        }
    }

    public function update(Request $request, Product $product)
    {
        $product->title = $request->title;
        $product->description = $request->description;
        $product->categories = $request->categories;
        $product->price = $request->price;
        $product->qty = $request->qty;
        $product->status = $request->status;
        
        $data = $product->update();

        if($product){
            return Response::json([
                'status' => '200',
                'message' => 'product data has been updated',
                'data' =>$data
            ], 200);
        }
    }

    public function delete(Product $product)
    {
        $product->delete();
        if($product){
            return Response::json([
                'status' => '200',
                'message' => 'product deleted successfully'
            ], 200);
        }else{
            return Response::json([
                'status' => '401',
                'message' => 'product has been not deleted'
            ], 401);
        }

    }
}
