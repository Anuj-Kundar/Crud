<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{  
    public function index()
    {
        $product = Product::all();
        return response()->json($product); 
    }   
    public function store(Request $request)
    {
        $product = new Product([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'quantity' => $request->input('quantity'),
        ]);
        $product->save();
        return response()->json('Product created!');
    }
    public function show($id)
    {
        $contact = Product::find($id);
        return response()->json($contact);
    }
    public function update(Request $request, $id)
    {
       $product = Product::find($id);
       $product->update($request->all());
       return response()->json('Product updated');
    }
    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
        return response()->json(' deleted!');
    }
}