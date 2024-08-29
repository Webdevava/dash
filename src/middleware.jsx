import { NextResponse } from "next/server"

export function middleware(){
    console.log('running')
    return NextResponse.next()
}