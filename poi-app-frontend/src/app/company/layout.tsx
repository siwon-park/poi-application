
/*
* next.js의 라우팅은 폴더와 파일로 가능하다.
* 폴더를 생성하고 layout.js와 page.js를 추가하면 된다.
* layout.jsx는 해당 폴더 내 모든 페이지에 적용되는 공통 레이아웃을 적용할 수 있다.
* */
export default function CompanyLayout({
   children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <nav> 회사 리스트 </nav>
            {/*
            children에 page.tsx가 들어가는 듯?
            */}
            <section>{children}</section>
        </div>
    )
}