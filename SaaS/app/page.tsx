"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Monitor, Smartphone, ArrowRight } from "lucide-react"

export default function HomePage() {
  const [selectedType, setSelectedType] = useState<"web" | "app" | null>(null)

  const handleNext = () => {
    if (selectedType === "web") {
      window.location.href = "/web-test"
    } else if (selectedType === "app") {
      // App 테스트는 향후 구현
      alert("App 테스트는 곧 지원될 예정입니다.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">소금프로젝트</h1>
          <p className="text-xl text-gray-600 mb-1">One-Stop End to End Automation UAT Solution</p>
          <Badge variant="secondary" className="text-sm">
            v1.0.0
          </Badge>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">테스트 유형 선택</CardTitle>
            <CardDescription className="text-center">자동화할 테스트 유형을 선택해주세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedType === "web" ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => setSelectedType("web")}
              >
                <CardContent className="p-6 text-center">
                  <Monitor className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-semibold mb-2">Web 테스트</h3>
                  <p className="text-gray-600 mb-4">웹사이트 URL을 입력하여 자동화된 UAT 테스트를 실행합니다</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• 스크린샷 캡처</li>
                    <li>• 응답시간 측정</li>
                    <li>• 성공/실패 분석</li>
                  </ul>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedType === "app" ? "ring-2 ring-green-500 bg-green-50" : ""
                }`}
                onClick={() => setSelectedType("app")}
              >
                <CardContent className="p-6 text-center">
                  <Smartphone className="w-16 h-16 mx-auto mb-4 text-green-600" />
                  <h3 className="text-xl font-semibold mb-2">App 테스트</h3>
                  <p className="text-gray-600 mb-4">모바일 앱에 대한 자동화된 UAT 테스트를 실행합니다</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• 앱 UI 테스트</li>
                    <li>• 기능 테스트</li>
                    <li>• 성능 분석</li>
                  </ul>
                  <Badge variant="outline" className="mt-2">
                    Coming Soon
                  </Badge>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-8">
              <Button onClick={handleNext} disabled={!selectedType} size="lg" className="px-8">
                다음 단계로 진행
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>© 2024 소금프로젝트. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
