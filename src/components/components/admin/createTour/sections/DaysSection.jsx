import { Section } from "../tourFormHelpers"
import { useState } from "react"
import { Form, Input, Button, Row, Col, Card, Space, Typography } from "antd"

const { Text } = Typography

const DaySection = ({ formData, setDay }) => {
    const [currentDay, setCurrentDay] = useState({
        dayNumber: "",
        description: "",
        title: "",
    })
    console.log(currentDay);
    console.log(formData);
    const handleAdd = () => {
        if (!currentDay.title) return;

        if (formData.days.length < formData.duration.days) {
            const newDays = [...formData.days, { ...currentDay }];
            setDay("days", newDays);

            setCurrentDay({ dayNumber: "", description: "", title: "" });
        }
    }
    const deleteDay = (index) => {
        const newDays = formData.days.filter((_, i) => i !== index);
        setDay("days", newDays);
    }
    return (
        <Section title="Программа тура (Дни)">
            <div style={{ marginBottom: 20 }}>
                {formData.days.map((item, index) => (
                    <Card
                        key={index}
                        size="small"
                        className="flex flex-col-reverse"
                        style={{ marginBottom: 8, background: '#f5f5f5' }}
                    >
                        <Space >
                            <div className="flex gap-4">
                                <Text strong>День {item.dayNumber || index + 1}:</Text>
                                <Text>{item.title}</Text>
                            </div>
                            <Button type="link" danger onClick={() => deleteDay(index)} >Удалить</Button>
                        </Space>
                        <Text className=" block">{item.description}</Text>
                    </Card>
                ))}
            </div>

            <Row gutter={16} align="bottom">
                <Col xs={6}>
                    <Form.Item label="№ дня">
                        <Input
                            value={currentDay.dayNumber}
                            onChange={(e) => setCurrentDay({ ...currentDay, dayNumber: e.target.value })}
                            placeholder="Напр: 1"
                        />
                    </Form.Item>
                </Col>
                <Col xs={18}>
                    <Form.Item label="Заголовок дня">
                        <Input
                            value={currentDay.title}
                            onChange={(e) => setCurrentDay({ ...currentDay, title: e.target.value })}
                            placeholder="Прибытие и заселение"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24}>
                    <Form.Item label="Описание">
                        <Input.TextArea
                            rows={2}
                            value={currentDay.description}
                            onChange={(e) => setCurrentDay({ ...currentDay, description: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Button
                type="dashed"
                block
                onClick={handleAdd}
                disabled={formData.days.length >= formData.duration.days && formData.duration.days !== 0}
            >
                + Добавить день в программу
            </Button>
        </Section>
    )
}

export default DaySection