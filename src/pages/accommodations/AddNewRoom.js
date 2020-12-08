import React, {Component} from 'react';

import './AddNewRoom.css';

class AddNewRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            number: '',
            category: '',
            capacity: 1,
            permissions: '',
            booking_condition: '',
            commentary: '',
            categories: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:3001/hotel/' + this.props.match.params.id + '/room/', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                room_number: this.state.number,
                category: this.state.category,
                capacity: this.state.capacity,
                permissions: JSON.stringify([this.state.permissions]),
                booking_condition: this.state.booking_condition,
                commentary: this.state.commentary
            })
        }).then(_ => this.props.history.push('/accommodations/hotel/' + this.props.match.params.id + '/rooms'),
                error => {console.log(error); this.props.history.push('/accommodations/hotel/' + this.props.match.params.id + '/rooms')}
        )
    }

    componentDidMount() {
        fetch('http://localhost:3001/categories/')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    category: result.categories[0].name,
                    categories: result.categories,
                })
            },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    componentWillUnmount() {
        this.setState({isLoaded: false})
    }

    render() {
        const { isLoaded, error, number, _category, _capacity, _permissions, booking_condition, commentary, categories } = this.state
        if (!isLoaded) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else if (error != null) {
            console.log(error)
            return (
                <div>
                    Error occured: {error.message}
                </div>
            )
        }
        return (
            <div className={'add_new_room'}>
                <div className={'rectangle_new_room'}>
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tr>
                                <td colspan="2" >
                                    <h1 className={'title_new_room'}> Добавление нового номера</h1>
                                </td>
                            </tr>

                            <tr>
                                <td width="40%" >
                                    <h1 className={'enterRoomData'}> Номер</h1>
                                </td>
                                <td >
                                    <input className={'input_rooms'} type="text" value={number} onChange={event => {this.setState({number: event.target.value})}} placeholder="введите номер" size="5" maxLength="3"></input>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}> Категория</h1>
                                </td>

                                <td>
                                    <select name="category" required onChange={event => {this.setState({category: event.target.value})}} className={'input_rooms_select'} >
                                        {categories.map(category => 
                                            <option>{category.name}</option>
                                        )}
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}> Количество мест в номере </h1>
                                </td>

                                <td>
                                    <select required onChange={event => {this.setState({capacity: event.target.value})}} className={'input_rooms_select'} >
                                        <option defaultChecked>1</option>
                                        <option >2</option>
                                        <option >3</option>
                                        <option >4</option>
                                        <option >5</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}> Разрешения </h1>
                                </td>

                                <td>
                                    <select required onChange={event => {this.setState({permissions: event.target.value})}} className={'input_rooms_select'} >
                                        <option defaultChecked>нет</option>
                                        <option >дети</option>
                                        <option >животные</option>
                                        <option >курение</option>
                                        <option >шум</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}> Условия бронирования  </h1>
                                </td>

                                <td>
                                    <input className={'input_rooms'} type="text" value={booking_condition} onChange={event => {this.setState({booking_condition: event.target.value})}} placeholder="введите условия для бронирования" size="5"></input>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}> Комментарий  </h1>
                                </td>

                                <td>
                                    <input className={'input_rooms'} type="text" value={commentary} onChange={event => {this.setState({commentary: event.target.value})}} placeholder="введите комментарий" size="5"></input>
                                </td>
                            </tr>
                        </table>

                        <div className={'horizontal'}>
                            <button className={'button_save_new_room'} type='submit'>
                                Сохранить
                            </button>

                            <button className={'button_cancel_new_room'} onClick={this.props.history.goBack} type='button'>
                                Отмена
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddNewRoom;