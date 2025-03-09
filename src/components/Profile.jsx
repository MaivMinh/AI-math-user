import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Tabs,
  Progress,
  Table,
  Tag,
  Statistic,
  Row,
  Col,
  Divider,
  Button,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  HistoryOutlined,
  TrophyOutlined,
  CalendarOutlined,
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Line } from "@ant-design/plots";

const Profile = ({ userData }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    const mockEnrollments = [
      {
        enrollmentId: 12,
        userId: 10,
        grade: 2,
        enrollmentDate: "2024-08-22",
        avgScore: 9,
        semester: 1,
        startYear: 2024,
        endYear: 2025,
      },
      {
        enrollmentId: "E12345",
        userId: "U789",
        grade: 10,
        enrollmentDate: "2024-06-15",
        avgScore: 85.7,
        semester: 1,
        startYear: 2024,
        endYear: 2025,
      },
      {
        enrollmentId: "E12346",
        userId: "U789",
        grade: 9,
        enrollmentDate: "2023-08-20",
        avgScore: 82.3,
        semester: 2,
        startYear: 2023,
        endYear: 2024,
      },
    ];

    setEnrollments(mockEnrollments);
  }, []);

  // Get current enrollment (most recent one)
  const currentEnrollment =
    enrollments.length > 0
      ? enrollments.reduce(
          (latest, enrollment) =>
            new Date(enrollment.enrollmentDate) >
            new Date(latest.enrollmentDate)
              ? enrollment
              : latest,
          enrollments[0]
        )
      : null;

  // Format for score tag color
  const getScoreColor = (score) => {
    if (score >= 9) return "success";
    if (score >= 8) return "processing";
    if (score >= 7) return "warning";
    return "error";
  };

  // Prepare performance data for chart
  const performanceData = enrollments.map((enrollment) => {
    return {
      year: `${enrollment.startYear}-${enrollment.endYear}`,
      score: enrollment.avgScore,
      grade: `Grade ${enrollment.grade}`,
    };
  });

  const items = [
    {
      key: "1",
      label: (
        <span className="">
          <BookOutlined />
          Current enrollment
        </span>
      ),
      children: (
        <div className="space-y-6">
          {currentEnrollment && (
            <>
              <div className="bg-gradient-to-r from-purple-100 to-indigo-50 p-5 rounded-xl shadow-sm">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">
                      Current Academic Year
                    </h3>
                    <p className="text-2xl font-bold text-purple-800">
                      {currentEnrollment.startYear} -{" "}
                      {currentEnrollment.endYear}
                    </p>
                    <div className="flex items-center mt-2 text-gray-600">
                      <CalendarOutlined className="mr-2" />
                      <span>Semester {currentEnrollment.semester}</span>
                    </div>
                  </div>
                  <div>
                    <Tag color="purple" className="text-lg px-3 py-1">
                      Grade {currentEnrollment.grade}
                    </Tag>
                  </div>
                </div>
              </div>

              <Card title="Current Performance" className="shadow-sm">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <Card bordered={false} className="bg-gray-50">
                      <Statistic
                        title="Average Score"
                        value={currentEnrollment.avgScore}
                        precision={1}
                        suffix="/ 10"
                        valueStyle={{ color: "#722ED1" }}
                      />
                      <Progress
                        percent={currentEnrollment.avgScore * 10}
                        strokeColor={{
                          "0%": "#722ED1",
                          "100%": "#1890FF",
                        }}
                        showInfo={false}
                        className="mt-2"
                      />
                    </Card>
                  </Col>
                </Row>
              </Card>
            </>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <HistoryOutlined />
          Enrollment History
        </span>
      ),
      children: (
        <div className="space-y-6">
          <Card title="Academic Progress" className="shadow-sm">
            <div style={{ height: 350 }}>
              <Line
                data={performanceData}
                xField="year"
                yField="score"
                seriesField="grade"
                yAxis={{
                  min: 0,
                  max: 10,
                }}
                legend={{
                  position: "top",
                }}
                smooth
                animation={{
                  appear: {
                    animation: "path-in",
                    duration: 1000,
                  },
                }}
                color={["#722ED1", "#2F54EB", "#1890FF"]}
              />
            </div>
          </Card>

          <Card title="Enrollment Records" className="shadow-sm">
            <Table
              dataSource={enrollments}
              rowKey="enrollmentId"
              pagination={false}
              columns={[
                {
                  title: "Academic Year",
                  dataIndex: "startYear",
                  key: "academicYear",
                  render: (_, record) =>
                    `${record.startYear}-${record.endYear}`,
                },
                {
                  title: "Grade",
                  dataIndex: "grade",
                  key: "grade",
                  render: (grade) => `Grade ${grade}`,
                },
                {
                  title: "Semester",
                  dataIndex: "semester",
                  key: "semester",
                },
                {
                  title: "Enrollment Date",
                  dataIndex: "enrollmentDate",
                  key: "enrollmentDate",
                },
                {
                  title: "Average Score",
                  dataIndex: "avgScore",
                  key: "avgScore",
                  render: (score) => (
                    <Tag color={getScoreColor(score)}>{score}%</Tag>
                  ),
                },
              ]}
            />
          </Card>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <SettingOutlined />
          Account Settings
        </span>
      ),
      children: (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <div className="w-32 font-medium text-gray-600">Full Name:</div>
              <div>Nguyễn Văn A</div>
              <Button type="text" icon={<EditOutlined />} size="small" />
            </div>
            <Divider className="my-2" />
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <div className="w-32 font-medium text-gray-600">Email:</div>
              <div>nguyenvana@example.com</div>
              <Button type="text" icon={<EditOutlined />} size="small" />
            </div>
            <Divider className="my-2" />
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <div className="w-32 font-medium text-gray-600">Phone:</div>
              <div>+84 123 456 789</div>
              <Button type="text" icon={<EditOutlined />} size="small" />
            </div>
            <Divider className="my-2" />
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <div className="w-32 font-medium text-gray-600">Password:</div>
              <div>••••••••••</div>
              <Button type="text" icon={<EditOutlined />} size="small" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-32 md:h-48"></div>
        <div className="px-4 py-6 md:px-8 md:py-8 -mt-16 md:-mt-24 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end">
            <Avatar
              size={{ xs: 96, sm: 96, md: 128, lg: 128, xl: 128, xxl: 128 }}
              icon={<UserOutlined />}
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="border-4 border-white shadow-md"
            />
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold">Nguyễn Văn A</h1>
              <p className="text-gray-600 flex items-center justify-center md:justify-start mt-1">
                <TrophyOutlined className="mr-2" />
                Student ID: STU-{userData?.userId || "789"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onChange={setActiveTab}
        items={items}
        className="bg-white rounded-xl shadow-md p-20"
        size="large"
      />
    </div>
  );
};

export default Profile;
