import {FC, useEffect, useRef} from "react";
import LoadingComponent from "../common/LoadingComponent.tsx";


interface InfiniteScrollProps {
    loading: boolean;            // 로딩 상태
    fetchMore: () => void;       // 추가 데이터를 가져오는 함수
}

const InfiniteScrollComponent: FC<InfiniteScrollProps> = ({ loading, fetchMore }) => {
    const loader = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && !loading) {
                    fetchMore();
                }
            },
            { threshold: 1.0 }  // 요소가 완전히 보일 때 트리거
        );

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [loading, fetchMore]);

    return (
        <div ref={loader} className="h-16 flex justify-center items-center">
            {loading && <LoadingComponent/>}
        </div>
    );
};

export default InfiniteScrollComponent;
