"use client"; // 이 줄을 추가하면 클라이언트 컴포넌트로 동작함

import { useParams } from "next/navigation";

export default function CompanyDetailPage() {
    const params = useParams<{id: string}>();
    return <h1>Company Name: {params.id}</h1>
}